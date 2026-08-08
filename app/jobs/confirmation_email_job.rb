# Delivers the email-confirmation mail. Takes an id, not a record — the user
# is reloaded at perform time and a vanished account is a silent no-op.
class ConfirmationEmailJob
  include Sidekiq::Job
  sidekiq_options queue: :default

  def perform(user_id)
    user = User.find_by(id: user_id)
    return unless user

    UserMailer.confirmation(user).deliver_now
  end
end
