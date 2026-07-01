# Return targets for Stripe Checkout. The webhook is the source of truth for
# fulfillment; these just give the member immediate feedback. fulfill! is
# idempotent, so a success return and the webhook can both fire safely.
class PaymentsController < ApplicationController
  before_action :require_authentication

  def success
    payment =
      current_user.payments.find_by(stripe_session_id: params[:session_id])

    if payment && checkout_paid?(payment)
      payment.fulfill!
      redirect_to manage_submissions_path,
                  notice: 'Payment received — your listing is now Featured. 🎉'
    else
      redirect_to manage_submissions_path,
                  alert:
                    "We couldn't confirm that payment yet. If you were charged, your listing will update shortly."
    end
  end

  def cancel
    redirect_to manage_submissions_path,
                notice:
                  'Checkout cancelled — your listing is live as a free entry. You can upgrade any time.'
  end

  private

  def checkout_paid?(payment)
    session = Stripe::Checkout::Session.retrieve(payment.stripe_session_id)
    payment.update(stripe_payment_intent: session.payment_intent)
    session.payment_status == 'paid'
  rescue Stripe::StripeError
    false
  end
end
