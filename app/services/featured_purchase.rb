# Turns a request to feature a listing into either an instant coupon grant or a
# Stripe Checkout redirect. The controller stays thin: it hands us the entry, the
# member, an optional coupon, and the return URLs, and redirects on the result.
class FeaturedPurchase
  # outcome: :granted (coupon), :checkout (pay), or :coupon_spent (code valid but
  # already redeemed — caller falls back to charging).
  Result = Struct.new(:outcome, :checkout_url, keyword_init: true)

  def initialize(entry:, user:, coupon: nil, success_url:, cancel_url:)
    @entry = entry
    @user = user
    @coupon = coupon
    @success_url = success_url
    @cancel_url = cancel_url
  end

  def call
    if KonamiCoupon.matches?(@coupon)
      return redeem_coupon if KonamiCoupon.available_to?(@user)

      return Result.new(outcome: :coupon_spent, checkout_url: start_checkout)
    end

    Result.new(outcome: :checkout, checkout_url: start_checkout)
  end

  private

  def redeem_coupon
    # Created pending so fulfill! actually runs (it no-ops on an already-settled row).
    payment =
      Payment.create!(
        entry: @entry,
        user: @user,
        amount_cents: 0,
        coupon_code: KonamiCoupon::CODE,
      )
    payment.fulfill!(status: 'free')
    Result.new(outcome: :granted)
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
