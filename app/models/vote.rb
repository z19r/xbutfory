class Vote < ApplicationRecord
  belongs_to :entry, counter_cache: true

  validates :voter_ip, presence: true
  validates :voter_ip, uniqueness: { scope: :entry_id }
end
