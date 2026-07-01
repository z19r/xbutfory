class RegistrationsController < ApplicationController
  layout 'auth'

  def new
    redirect_to(root_path) and return if user_signed_in?
  end

  def create
    user = User.new(registration_params)
    if user.save
      UserMailer.confirmation(user).deliver_later
      sign_in(user)
      redirect_to root_path,
                  notice:
                    "Welcome, @#{user.handle}. Check your email to confirm."
    else
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
