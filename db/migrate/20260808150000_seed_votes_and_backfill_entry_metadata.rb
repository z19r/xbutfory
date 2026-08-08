# One-time seed: give every existing listing a plausible history. Each entry
# gets 1–85 real vote rows (from distinct random members), a randomized
# submitter, and a submission time somewhere in the last two months.
#
# Bulk-inserts votes with local AR classes so the app's Vote callbacks
# (MilestoneNotifier email) and uniqueness validation never fire here.
class SeedVotesAndBackfillEntryMetadata < ActiveRecord::Migration[8.1]
  # Local, callback-free stand-ins bound to the live tables.
  class SeedEntry < ActiveRecord::Base
    self.table_name = "entries"
  end

  class SeedVote < ActiveRecord::Base
    self.table_name = "votes"
  end

  MAX_VOTES = 85
  WINDOW = 2.months

  def up
    now = Time.current
    user_ids = ActiveRecord::Base.connection
      .select_values("SELECT id FROM users")
    raise "no users to seed votes from" if user_ids.empty?

    ceiling = [MAX_VOTES, user_ids.length].min

    SeedEntry.find_each do |entry|
      submitted_at = now - rand(0.0..WINDOW.to_f).seconds
      vote_count = rand(1..ceiling)

      voter_ids = user_ids.sample(vote_count)
      rows = voter_ids.map do |uid|
        voted_at = submitted_at + rand(0.0..(now - submitted_at).to_f).seconds
        { entry_id: entry.id, user_id: uid,
          created_at: voted_at, updated_at: voted_at }
      end
      SeedVote.insert_all(rows) if rows.any?

      entry.update_columns(
        user_id: user_ids.sample,
        votes_count: voter_ids.length,
        created_at: submitted_at,
        updated_at: now,
      )
    end
  end

  def down
    SeedVote.delete_all
    SeedEntry.update_all(votes_count: 0)
  end
end
