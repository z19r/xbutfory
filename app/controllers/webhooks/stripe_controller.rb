module Webhooks
  # Stripe's server-to-server callback — the authoritative fulfillment path.
  # No session/CSRF; authenticity comes from the signed payload.
  class StripeController < ApplicationController
    skip_before_action :verify_authenticity_token, raise: false

    def create
      event = verified_event
      return head :bad_request unless event

      session = event.data.object

      case event.type
      when 'checkout.session.completed'
        Payment.find_by(stripe_session_id: session.id)&.fulfill!(
          payment_intent: session.payment_intent,
        )
      when 'checkout.session.expired'
        # An abandoned checkout closes out the pending row; the entry never
        # left the free tier, so there's nothing to demote.
        payment = Payment.find_by(stripe_session_id: session.id)
        payment&.with_lock { payment.fail! if payment.pending? }
      end

      head :ok
    end

    private

    def verified_event
      payload = request.body.read
      signature = request.env['HTTP_STRIPE_SIGNATURE']
      secret = Rails.configuration.x.stripe.webhook_secret

      Stripe::Webhook.construct_event(payload, signature, secret)
    rescue JSON::ParserError, Stripe::SignatureVerificationError
      nil
    end
  end
end
