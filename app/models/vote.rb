class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :entry, counter_cache: true

  # One vote per member per entry.
  validates :user_id, uniqueness: { scope: :entry_id }
end
