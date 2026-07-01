class AddStateToUsers < ActiveRecord::Migration[8.1]
  def up
    add_column :users, :state, :string, null: false, default: 'unconfirmed'
    add_index :users, :state

    # Backfill from the existing confirmed_at timestamp.
    execute(
      "UPDATE users SET state = 'confirmed' WHERE confirmed_at IS NOT NULL"
    )
  end

  def down
    remove_column :users, :state
  end
end
