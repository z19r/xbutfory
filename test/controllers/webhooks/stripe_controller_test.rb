require 'test_helper'

class Webhooks::StripeControllerTest < ActionDispatch::IntegrationTest
  def payment
    @payment ||=
      Payment.create!(
        entry: entries(:two),
        user: users(:member),
        amount_cents: 199,
        stripe_session_id: 'cs_hook',
      )
  end

  def completed_event(session_id: 'cs_hook', payment_intent: 'pi_hook')
    object = Struct.new(:id, :payment_intent).new(session_id, payment_intent)
    Struct.new(:type, :data).new(
      'checkout.session.completed',
      Struct.new(:object).new(object),
    )
  end

  test 'a completed checkout session fulfills the matching payment' do
    payment
    stub_method(Stripe::Webhook, :construct_event, completed_event) do
      post webhooks_stripe_path,
           params: '{}',
           headers: {
             'HTTP_STRIPE_SIGNATURE' => 'sig',
           }
    end

    assert_response :ok
    assert_equal 'paid', payment.reload.status
    assert_equal 'pi_hook', payment.stripe_payment_intent
    assert_equal 'featured', payment.entry.reload.tier
  end

  def expired_event(session_id: 'cs_hook')
    object = Struct.new(:id, :payment_intent).new(session_id, nil)
    Struct.new(:type, :data).new(
      'checkout.session.expired',
      Struct.new(:object).new(object),
    )
  end

  test 'an expired checkout session fails the pending payment' do
    payment
    stub_method(Stripe::Webhook, :construct_event, expired_event) do
      post webhooks_stripe_path,
           params: '{}',
           headers: {
             'HTTP_STRIPE_SIGNATURE' => 'sig',
           }
    end

    assert_response :ok
    assert_equal 'failed', payment.reload.status
    assert_equal 'free', payment.entry.reload.tier
  end

  test 'an expired event after settlement is a no-op' do
    payment.fulfill!
    stub_method(Stripe::Webhook, :construct_event, expired_event) do
      post webhooks_stripe_path,
           params: '{}',
           headers: {
             'HTTP_STRIPE_SIGNATURE' => 'sig',
           }
    end

    assert_response :ok
    assert_equal 'paid', payment.reload.status
  end

  test 'a bad signature is rejected' do
    raiser = ->(*) do
      raise Stripe::SignatureVerificationError.new('bad', 'sig')
    end
    stub_method(Stripe::Webhook, :construct_event, raiser) do
      post webhooks_stripe_path,
           params: '{}',
           headers: {
             'HTTP_STRIPE_SIGNATURE' => 'nope',
           }
    end

    assert_response :bad_request
  end
end
