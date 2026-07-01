class AddNsfwToEntries < ActiveRecord::Migration[8.1]
  def change
    add_column :entries, :nsfw, :boolean, default: false, null: false
  end
end
