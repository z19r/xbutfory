class CreateProductsAndLinkEntries < ActiveRecord::Migration[8.1]
  def change
    create_table :products do |t|
      t.string :name, null: false
      t.string :slug, null: false
      t.string :url

      t.timestamps
    end

    # The X is curated, so names are unique case-insensitively (like handles).
    add_index :products, 'lower(name)', unique: true, name: 'index_products_on_lower_name'
    add_index :products, :slug, unique: true

    # Entries reference their X via a real FK; the denormalized `x` string stays
    # for display/search. Nullable so seeds/back-office rows aren't forced.
    add_reference :entries, :product, foreign_key: true, null: true
  end
end
