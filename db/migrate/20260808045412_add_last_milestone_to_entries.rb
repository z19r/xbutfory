class AddLastMilestoneToEntries < ActiveRecord::Migration[8.1]
  # High-water mark for milestone emails. MilestoneNotifier claims a
  # milestone with an atomic conditional UPDATE on this column, so two
  # concurrent votes can never double-send the same threshold.
  def change
    add_column :entries, :last_milestone, :integer, default: 0, null: false
  end
end
