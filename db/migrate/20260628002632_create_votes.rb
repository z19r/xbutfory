class CreateVotes < ActiveRecord::Migration[8.1]
  def change
    create_table :votes do |t|
      t.references :entry, null: false, foreign_key: true
      t.string :voter_ip, null: false

      t.timestamps
    end

    add_index :votes, [:entry_id, :voter_ip], unique: true
  end
end
