# Votes move from an anonymous (entry_id, voter_ip) counter to one vote per
# (user_id, entry_id) pair. Existing anonymous votes can't be attributed to a
# member, so they're cleared — the displayed totals live on entries.votes_count
# (untouched here; we delete via raw SQL to bypass the counter_cache callback).
class ReworkVotesPerUser < ActiveRecord::Migration[8.1]
  def up
    execute("DELETE FROM votes")
    remove_index :votes, name: "index_votes_on_entry_id_and_voter_ip"
    remove_column :votes, :voter_ip
    add_reference :votes, :user, null: false, foreign_key: true
    add_index :votes, [ :user_id, :entry_id ], unique: true
  end

  def down
    remove_index :votes, column: [ :user_id, :entry_id ]
    remove_reference :votes, :user, foreign_key: true
    add_column :votes, :voter_ip, :string, null: false, default: ""
    add_index :votes, [ :entry_id, :voter_ip ], unique: true, name: "index_votes_on_entry_id_and_voter_ip"
  end
end
