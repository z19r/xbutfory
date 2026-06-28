class AddDetailFieldsToEntries < ActiveRecord::Migration[8.1]
  def change
    add_column :entries, :name, :string
    add_column :entries, :tagline, :string
    add_column :entries, :why, :text
  end
end
