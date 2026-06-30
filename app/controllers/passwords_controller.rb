class PasswordsController < ApplicationController
  layout "auth"

  before_action :set_user_by_token, only: %i[edit update]

  def new
  end

  # Always reports success (don't leak which emails exist).
  def create
    user = User.find_by(email: params[:email].to_s.strip.downcase)
    UserMailer.password_reset(user).deliver_later if user
    redirect_to sign_in_path, notice: "If that email is registered, a reset link is on its way."
  end

  def edit
  end

  def update
    if @user.update(password_params)
      redirect_to sign_in_path, notice: "Password updated — sign in with your new one."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def set_user_by_token
    @user = User.find_by_token_for(:password_reset, params[:token])
    return if @user

    redirect_to new_password_reset_path, alert: "That reset link is invalid or has expired."
  end

  def password_params
    params.permit(:password, :password_confirmation)
  end
end
