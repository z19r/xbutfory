require 'test_helper'

class PaymentsControllerTest < ActionDispatch::IntegrationTest
  def payment
    @payment ||=
      Payment.create!(
        entry: entries(:two),
        user: users(:member),
        amount_cents: 199,
        stripe_session_id: 'cs_test_ok',
      )
  end

  def paid_session
    Struct.new(:payment_status, :payment_intent).new('paid', 'pi_abc')
  end

  def unpaid_session
    Struct.new(:payment_status, :payment_intent).new('unpaid', nil)
  end

  test 'a paid return fulfills the payment and promotes the listing' do
    sign_in_as(users(:member))
    stub_method(Stripe::Checkout::Session, :retrieve, paid_session) do
      get checkout_success_path(session_id: payment.stripe_session_id)
    end

    assert_redirected_to manage_submissions_path
    assert_equal 'paid', payment.reload.status
    assert_equal 'featured', payment.entry.reload.tier
  end

  test 'an unpaid return does not promote the listing' do
    sign_in_as(users(:member))
    stub_method(Stripe::Checkout::Session, :retrieve, unpaid_session) do
      get checkout_success_path(session_id: payment.stripe_session_id)
    end

    assert_redirected_to manage_submissions_path
    assert_equal 'pending', payment.reload.status
    assert_equal 'free', payment.entry.reload.tier
  end

  test 'cancelling leaves the listing as a free entry' do
    sign_in_as(users(:member))
    get checkout_cancel_path
    assert_redirected_to manage_submissions_path
    assert_match(/free entry/i, flash[:notice])
  end

  test 'checkout returns require a signed-in member' do
    get checkout_success_path(session_id: 'whatever')
    assert_redirected_to sign_in_path
  end
end
