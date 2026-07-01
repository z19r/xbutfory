require 'test_helper'

class PaymentTest < ActiveSupport::TestCase
  def pending_payment(status: 'pending')
    Payment.create!(
      entry: entries(:two),
      user: users(:member),
      amount_cents: 199,
      status: status,
    )
  end

  test 'a new payment starts pending' do
    assert pending_payment.pending?
  end

  test 'fail moves a pending payment to failed without promoting the entry' do
    payment = pending_payment
    payment.fail!
    assert payment.failed?
    assert_equal 'free', payment.entry.reload.tier
  end

  test 'refund reverses a paid payment and demotes the entry' do
    payment = pending_payment
    payment.pay!
    assert_equal 'featured', payment.entry.reload.tier

    payment.refund!

    assert payment.refunded?
    assert_equal 'free', payment.entry.reload.tier
  end

  test 'fulfilling a payment promotes its entry to the featured tier' do
    payment = pending_payment
    assert_equal 'free', payment.entry.tier

    payment.fulfill!(payment_intent: 'pi_123')

    assert_equal 'paid', payment.reload.status
    assert_equal 'pi_123', payment.stripe_payment_intent
    assert_equal 'featured', payment.entry.reload.tier
  end

  test 'fulfilling is idempotent' do
    payment = pending_payment
    payment.fulfill!
    assert_no_changes -> { payment.reload.updated_at } do
      payment.fulfill!(payment_intent: 'pi_should_be_ignored')
    end
    assert_nil payment.reload.stripe_payment_intent
  end

  test 'a coupon grant settles as free' do
    payment = pending_payment(status: 'free')
    assert payment.settled?
  end

  test 'settled scope covers paid and free' do
    paid = pending_payment
    paid.fulfill!
    free =
      Payment.create!(
        entry: entries(:three),
        user: users(:member),
        amount_cents: 0,
        status: 'free',
      )
    assert_equal [free, paid].map(&:id).sort, Payment.settled.pluck(:id).sort
  end
end
