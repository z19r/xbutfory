# Emails an entry's owner when its vote count crosses an editorial milestone.
# Called from Vote's after_create_commit — one vote lands the count on a threshold
# exactly once, so there's no double-fire to guard against.
class MilestoneNotifier
  THRESHOLDS = [10, 25, 50, 100, 250, 500, 1000].freeze

  def self.check(entry)
    new(entry).check
  end

  def initialize(entry)
    @entry = entry
  end

  def check
    count = @entry.reload.votes_count
    return unless THRESHOLDS.include?(count)

    owner = @entry.user
    return unless notifiable?(owner)

    MilestoneMailer.reached(user: owner, entry: @entry, milestone: count).deliver_later
  end

  private

  def notifiable?(owner)
    owner.present? && owner.milestone_notifications? && owner.handle != "legacy"
  end
end
