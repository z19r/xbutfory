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
    return unless self.class.notifiable?(@entry.user)
    return unless claim(count)

    MilestoneEmailJob.perform_async(@entry.id, count)
  end

  # Shared with MilestoneEmailJob, which re-checks at perform time.
  def self.notifiable?(owner)
    owner.present? && owner.milestone_notifications? && owner.handle != 'legacy'
  end

  private

  # Atomically advances the entry's milestone high-water mark. Exactly one of
  # any concurrent checks wins the conditional UPDATE, so a threshold can
  # never email twice.
  def claim(count)
    Entry
      .where(id: @entry.id)
      .where(last_milestone: ...count)
      .update_all(last_milestone: count) == 1
  end
end
