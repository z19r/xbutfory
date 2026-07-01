# A standalone (no account required) subscriber to the weekly "X but for Y" digest.
# Logged-in members opt in via their account instead — see User#digest_opt_in.
class DigestSubscription < ApplicationRecord
  EMAIL_FORMAT = /\A[^@\s]+@[^@\s]+\z/

  before_validation :normalize_email

  validates :email,
            presence: true,
            format: {
              with: EMAIL_FORMAT,
            },
            uniqueness: {
              case_sensitive: false,
            }

  # Single-purpose, non-expiring token used for one-click unsubscribe links.
  generates_token_for :unsubscribe

  private

  def normalize_email
    self.email = email.to_s.strip.downcase.presence
  end
end
