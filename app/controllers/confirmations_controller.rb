class ConfirmationsController < ApplicationController
  # Confirm via the tokened link from the email.
  def show
    user = User.find_by_token_for(:email_confirmation, params[:token])
    if user
      if user.may_confirm? # idempotent on a second click
        user.confirm!
        SentryMetrics.count('auth.email_confirmed')
      end
      redirect_to root_path, notice: "Email confirmed — you're all set."
    else
      SentryMetrics.count('auth.email_confirm_failed')
      redirect_to root_path,
                  alert: 'That confirmation link is invalid or has expired.'
    end
  end

  # Resend the confirmation email to the signed-in, still-unconfirmed member.
  def create
    if current_user && !current_user.confirmed?
      ConfirmationEmailJob.perform_async(current_user.id)
      SentryMetrics.count('auth.confirmation_resent')
    end
    redirect_back fallback_location: root_path,
                  notice: 'Confirmation email on its way.'
  end
end
