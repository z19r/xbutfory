class AddApprovedAtToProducts < ActiveRecord::Migration[8.1]
  def up
    # AASM state for the X's approval lifecycle. approved_at is the audit
    # timestamp stamped when the approve event fires.
    add_column :products, :state, :string, null: false, default: 'pending'
    add_column :products, :approved_at, :datetime
    add_index :products, :state

    # Existing products come from the curated seed, so they're already approved.
    execute(
      "UPDATE products SET state = 'approved', approved_at = CURRENT_TIMESTAMP"
    )
  end

  def down
    remove_column :products, :state
    remove_column :products, :approved_at
  end
end
