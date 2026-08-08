class RegistrationsController < ApplicationController
  layout 'auth'

  def new
    redirect_to(root_path) and return if user_signed_in?
  end

  def create
    user = User.new(registration_params)
    if user.save
      ConfirmationEmailJob.perform_async(user.id)
      sign_in(user)
      SentryMetrics.count('auth.signup')
      flash[:umami_event] = 'Signup completed'
      redirect_to root_path,
                  notice:
                    "Welcome, @#{user.handle}. Check your email to confirm."
    else
      SentryMetrics.count('auth.signup_failed')
      redirect_to sign_up_path, alert: user.errors.full_messages.to_sentence
    end
  end

  private

  def registration_params
    params.permit(
      :handle,
      :display_name,
      :email,
      :password,
      :password_confirmation,
      :bio,
    )
  end
end
