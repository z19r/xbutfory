class SessionsController < ApplicationController
  layout "auth"

  def new
    redirect_to(root_path) and return if user_signed_in?
  end

  def create
    user = User.find_by(email: params[:email].to_s.strip.downcase)
    if user&.authenticate(params[:password])
      sign_in(user)
      redirect_to after_sign_in_path, notice: "Signed in as @#{user.handle}."
    else
      redirect_to sign_in_path, alert: "That email and password don't match."
    end
  end

  def destroy
    sign_out
    redirect_to root_path, notice: "Signed out."
  end
end
