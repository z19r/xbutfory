class ConfirmationsController < ApplicationController
  # Confirm via the tokened link from the email.
  def show
    user = User.find_by_token_for(:email_confirmation, params[:token])
    if user
      user.confirm!
      redirect_to root_path, notice: "Email confirmed — you're all set."
    else
      redirect_to root_path,
                  alert: 'That confirmation link is invalid or has expired.'
    end
  end

  # Resend the confirmation email to the signed-in, still-unconfirmed member.
  def create
    if current_user && !current_user.confirmed?
      UserMailer.confirmation(current_user).deliver_later
    end
    redirect_back fallback_location: root_path,
                  notice: 'Confirmation email on its way.'
  end
end
