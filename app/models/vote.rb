class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :entry, counter_cache: true

  # One vote per member per entry.
  validates :user_id, uniqueness: { scope: :entry_id }

  # Notify the owner when this vote lands the tally on an editorial milestone.
  after_create_commit { MilestoneNotifier.check(entry) }
end
