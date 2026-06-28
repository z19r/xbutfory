class SessionsController < ApplicationController
  def new
    # The full sign-in screen is built in Phase D; for now bounce home.
    redirect_to root_path, notice: "Sign-in screen coming soon."
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
