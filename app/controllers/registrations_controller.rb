class RegistrationsController < ApplicationController
  layout "auth"

  def new
    redirect_to(root_path) and return if user_signed_in?
  end

  def create
    user = User.new(registration_params)
    if user.save
      sign_in(user)
      redirect_to root_path, notice: "Welcome, @#{user.handle}. You're in."
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
