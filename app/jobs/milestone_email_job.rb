# Delivers the vote-milestone mail. Re-checks notifiability at perform time —
# the owner may have opted out (or the entry vanished) since enqueue.
class MilestoneEmailJob
  include Sidekiq::Job
  sidekiq_options queue: :default

  def perform(entry_id, milestone)
    entry = Entry.find_by(id: entry_id)
    return unless entry && MilestoneNotifier.notifiable?(entry.user)

    MilestoneMailer.reached(
      user: entry.user,
      entry: entry,
      milestone: milestone,
    ).deliver_now
  end
end
