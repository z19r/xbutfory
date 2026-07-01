class DigestMailer < ApplicationMailer
  # The weekly roundup. `unsubscribe_token` is present only for standalone
  # subscribers; members manage the digest from their account settings.
  def weekly(email:, entries:, unsubscribe_token: nil)
    @entries = entries
    @unsubscribe_url =
      unsubscribe_token && digest_unsubscribe_url(token: unsubscribe_token)

    mail to: email, subject: 'This week in “X but for Y”'
  end
end
