require 'test_helper'

class FeaturedPurchaseTest < ActiveSupport::TestCase
  setup { Stripe.api_key = 'sk_test_dummy' }
  teardown { Stripe.api_key = nil }

  def purchase(coupon: nil)
    FeaturedPurchase.new(
      entry: entries(:two),
      user: users(:member),
      coupon: coupon,
      success_url: 'http://x/s',
      cancel_url: 'http://x/c',
    )
  end

  def fake_session(
    id: 'cs_test_123',
    url: 'https://checkout.stripe.com/pay/cs_test_123'
  )
    Struct.new(:id, :url).new(id, url)
  end

  test 'the konami coupon grants featured for free without touching Stripe' do
    result = nil
    stub_method(
      Stripe::Checkout::Session,
      :create,
      ->(*) { flunk 'Stripe should not be called' },
    ) { result = purchase(coupon: 'xbutfory-k0n4m1').call }

    assert_equal :granted, result.outcome
    assert_equal 'featured', entries(:two).reload.tier
    assert users(:member).payments.exists?(
             coupon_code: KonamiCoupon::CODE,
             status: 'free',
           )
  end

  test 'without a coupon it opens a pending payment and returns a checkout url' do
    result = nil
    stub_method(Stripe::Checkout::Session, :create, fake_session) do
      result = purchase.call
    end

    assert_equal :checkout, result.outcome
    assert_equal 'https://checkout.stripe.com/pay/cs_test_123',
                 result.checkout_url

    payment = users(:member).payments.order(:created_at).last
    assert_equal 'pending', payment.status
    assert_equal 'cs_test_123', payment.stripe_session_id
    assert_equal 199, payment.amount_cents
    assert_equal 'free', entries(:two).reload.tier, 'not promoted until paid'
  end

  test 'a coupon already spent falls through to a paid checkout' do
    Payment.create!(
      entry: entries(:one),
      user: users(:member),
      amount_cents: 0,
      status: 'free',
      coupon_code: KonamiCoupon::CODE,
    )
    result = nil
    stub_method(
      Stripe::Checkout::Session,
      :create,
      fake_session(id: 'cs_9', url: 'https://c/9'),
    ) { result = purchase(coupon: KonamiCoupon::CODE).call }

    assert_equal :coupon_spent, result.outcome
    assert_equal 'https://c/9', result.checkout_url
  end

  test 'a member can only redeem the konami coupon once' do
    first = purchase(coupon: KonamiCoupon::CODE).call
    assert_equal :granted, first.outcome

    second = nil
    stub_method(
      Stripe::Checkout::Session,
      :create,
      fake_session(id: 'cs_dup', url: 'https://c/dup'),
    ) { second = purchase(coupon: KonamiCoupon::CODE).call }

    assert_equal :coupon_spent, second.outcome
    assert_equal 1,
                 users(:member)
                   .payments
                   .where(coupon_code: KonamiCoupon::CODE)
                   .count,
                 'the free coupon must not be granted twice'
  end

  test 'without Stripe keys the paid path reports unconfigured instead of erroring' do
    Stripe.api_key = nil
    result = nil
    stub_method(
      Stripe::Checkout::Session,
      :create,
      ->(*) { flunk 'Stripe should not be called' },
    ) { result = purchase.call }

    assert_equal :unconfigured, result.outcome
    assert_equal 'free', entries(:two).reload.tier
  end
end
