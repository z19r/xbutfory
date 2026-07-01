# A single Featured-listing purchase. `pending` while Stripe Checkout is in
# flight, `paid` once Stripe confirms, `free` when granted by a coupon. Fulfilling
# a payment is what actually promotes the entry to the Featured tier.
class Payment < ApplicationRecord
  belongs_to :entry
  belongs_to :user

  FEATURED_PRICE_CENTS = 199

  STATUSES = %w[pending paid failed free].freeze
  validates :status, inclusion: { in: STATUSES }

  scope :settled, -> { where(status: %w[paid free]) }

  def settled?
    status.in?(%w[paid free])
  end

  # Idempotent: mark the purchase settled and promote its entry to Featured.
  def fulfill!(status: 'paid', payment_intent: nil)
    return if settled?

    transaction do
      update!(status: status, stripe_payment_intent: payment_intent)
      entry.update!(tier: 'featured')
    end
  end
end
