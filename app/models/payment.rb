# A single Featured-listing purchase. `pending` while Stripe Checkout is in
# flight, `paid` once Stripe confirms, `free` when granted by a coupon,
# `refunded` if reversed. Fulfilling a payment promotes the entry to Featured.
class Payment < ApplicationRecord
  include AASM

  belongs_to :entry
  belongs_to :user

  FEATURED_PRICE_CENTS = 199

  STATUSES = %w[pending paid free failed refunded].freeze
  validates :status, inclusion: { in: STATUSES }

  scope :settled, -> { where(status: %w[paid free]) }

  # AASM on the `status` column. `pay`/`grant` promote the entry; `refund`
  # reverses it. Predicates (paid?/free?/…) are generated.
  aasm column: :status do
    state :pending, initial: true
    state :paid
    state :free
    state :failed
    state :refunded

    event :pay do
      transitions from: :pending, to: :paid, after: :promote_entry
    end

    event :grant do
      transitions from: :pending, to: :free, after: :promote_entry
    end

    event :fail do
      transitions from: :pending, to: :failed
    end

    event :refund do
      transitions from: %i[paid free], to: :refunded, after: :demote_entry
    end
  end

  def settled?
    paid? || free?
  end

  # Idempotent and race-safe: settle the purchase and promote its entry to
  # Featured. The row lock reloads state, so the success return and the
  # webhook can both fire (even concurrently) and only one settles. Kept as
  # the public API for the webhook and coupon flows; drives the state machine.
  def fulfill!(status: 'paid', payment_intent: nil)
    with_lock do
      next if settled?

      self.stripe_payment_intent = payment_intent if payment_intent
      status.to_s == 'free' ? grant! : pay!
    end
  end

  private

  # Fires once per settlement (both the paid and free/coupon paths run through
  # here), so it's the single source of truth for the "listing went Featured"
  # metric regardless of whether the return page or the webhook won the race.
  def promote_entry
    entry.update!(tier: 'featured')
    SentryMetrics.count(
      'payment.settled',
      status: status,
      amount_cents: amount_cents.to_i.zero? ? 'free' : 'paid',
    )
    SentryMetrics.distribution(
      'payment.amount',
      amount_cents.to_i / 100.0,
      unit: 'none',
    )
  end

  def demote_entry
    entry.update!(tier: 'free')
    SentryMetrics.count('payment.refunded')
  end
end
