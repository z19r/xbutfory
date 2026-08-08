# Delivers one recipient's weekly digest. Entry ids are reloaded through the
# live/sfw scopes here so a listing pulled between enqueue and delivery
# quietly drops out; if nothing survives, no email goes out.
class DigestEmailJob
  include Sidekiq::Job
  sidekiq_options queue: :default

  def perform(email, entry_ids, unsubscribe_token = nil)
    entries =
      Entry.live.sfw.where(id: entry_ids).sort_by do |entry|
        entry_ids.index(entry.id)
      end
    return if entries.empty?

    DigestMailer.weekly(
      email: email,
      entries: entries,
      unsubscribe_token: unsubscribe_token,
    ).deliver_now
  end
end
