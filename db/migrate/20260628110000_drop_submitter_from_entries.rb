# The byline is now users.handle via user_id (Phase 2 complete); the free-text
# submitter column is no longer read anywhere. Drop it.
class DropSubmitterFromEntries < ActiveRecord::Migration[8.1]
  def change
    remove_column :entries, :submitter, :string, null: false
  end
end
