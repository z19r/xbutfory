# Turns a request to feature a listing into either an instant coupon grant or a
# Stripe Checkout redirect. The controller stays thin: it hands us the entry, the
# member, an optional coupon, and the return URLs, and redirects on the result.
class FeaturedPurchase
  # outcome: :granted (coupon), :checkout (pay), :coupon_spent (code valid but
  # already redeemed — falls back to charging), or :unconfigured (no Stripe keys
  # in this environment — the listing simply stays free).
  Result = Struct.new(:outcome, :checkout_url, keyword_init: true)

  def initialize(entry:, user:, coupon: nil, success_url:, cancel_url:)
    @entry = entry
    @user = user
    @coupon = coupon
    @success_url = success_url
    @cancel_url = cancel_url
  end

  def call
    coupon_matches = KonamiCoupon.matches?(@coupon)

    return Result.new(outcome: :granted) if coupon_matches && redeem_coupon

    # A coupon skips Stripe; anything else needs card payments to be configured.
    return Result.new(outcome: :unconfigured) unless Stripe.api_key.present?

    Result.new(
      outcome: coupon_matches ? :coupon_spent : :checkout,
      checkout_url: start_checkout,
    )
  end

  private

  # Redeems the one-per-member coupon under a row lock so two simultaneous
  # requests can't both clear the availability check and double-grant. Returns
  # whether the grant happened (false = already spent → caller charges instead).
  def redeem_coupon
    granted = false
    @user.with_lock do
      break unless KonamiCoupon.available_to?(@user)

      # Created pending so fulfill! actually runs (no-ops on a settled row).
      payment =
        Payment.create!(
          entry: @entry,
          user: @user,
          amount_cents: 0,
          coupon_code: KonamiCoupon::CODE,
        )
      payment.fulfill!(status: 'free')
      granted = true
    end
    granted
  end

  def start_checkout
    payment =
      Payment.create!(
        entry: @entry,
        user: @user,
        amount_cents: Payment::FEATURED_PRICE_CENTS,
      )

    session =
      Stripe::Checkout::Session.create(
        mode: 'payment',
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: 'usd',
              unit_amount: Payment::FEATURED_PRICE_CENTS,
              product_data: {
                name: "Featured listing — #{@entry.title}",
              },
            },
          },
        ],
        success_url: @success_url,
        cancel_url: @cancel_url,
        client_reference_id: payment.id.to_s,
        metadata: {
          payment_id: payment.id,
        },
      )

    payment.update!(stripe_session_id: session.id)
    session.url
  end
end
