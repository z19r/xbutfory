class UserMailer < ApplicationMailer
  # Password reset link (token valid 15 minutes).
  def password_reset(user)
    @user = user
    @token = user.generate_token_for(:password_reset)
    mail to: user.email, subject: 'Reset your XbutforY password'
  end

  # Email confirmation link (token valid 2 days).
  def confirmation(user)
    @user = user
    @token = user.generate_token_for(:email_confirmation)
    mail to: user.email, subject: 'Confirm your XbutforY email'
  end
end
