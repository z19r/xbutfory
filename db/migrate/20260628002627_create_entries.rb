class CreateEntries < ActiveRecord::Migration[8.1]
  def change
    create_table :entries do |t|
      t.string :x, null: false
      t.string :y, null: false
      t.text :description
      t.string :url
      t.string :submitter, null: false
      t.string :category
      t.string :stamp
      t.string :sponsored
      t.integer :votes_count, default: 0, null: false
      t.string :slug, null: false

      t.timestamps
    end

    add_index :entries, :slug, unique: true
    add_index :entries, :category
    add_index :entries, :created_at
  end
end
