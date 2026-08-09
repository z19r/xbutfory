class SessionsController < ApplicationController
  layout 'auth'

  def new
    redirect_to(root_path) and return if user_signed_in?
  end

  def create
    user = User.find_by_login(params[:login])
    if user&.suspended? && user.authenticate(params[:password])
      SentryMetrics.count('auth.login', success: 'suspended')
      redirect_to sign_in_path,
                  alert: 'This account is suspended. Contact the editors.'
    elsif user&.authenticate(params[:password])
      sign_in(user)
      SentryMetrics.count('auth.login', success: 'true')
      redirect_to after_sign_in_path, notice: "Signed in as @#{user.handle}."
    else
      SentryMetrics.count('auth.login', success: 'false')
      redirect_to sign_in_path,
                  alert: "That email or @handle and password don't match."
    end
  end

  def destroy
    sign_out
    SentryMetrics.count('auth.logout')
    redirect_to root_path, notice: 'Signed out.'
  end
end
