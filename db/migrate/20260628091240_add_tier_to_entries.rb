class AddTierToEntries < ActiveRecord::Migration[8.1]
  def change
    add_column :entries, :tier, :string, default: "free", null: false
  end
end
