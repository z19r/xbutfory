class CreateUsers < ActiveRecord::Migration[8.1]
  def change
    create_table :users do |t|
      t.string :handle, null: false # public @handle — unique, lowercased, permanent
      t.string :display_name
      t.string :email, null: false # private, unique
      t.string :password_digest, null: false
      t.text :bio
      t.string :avatar_url
      t.boolean :digest_opt_in, null: false, default: true
      t.boolean :reply_notifications, null: false, default: true
      t.boolean :milestone_notifications, null: false, default: true
      t.string :api_key, null: false # personal RSS + API token

      t.timestamps
    end

    add_index :users,
              'lower(handle)',
              unique: true,
              name: 'index_users_on_lower_handle'
    add_index :users,
              'lower(email)',
              unique: true,
              name: 'index_users_on_lower_email'
    add_index :users, :api_key, unique: true
  end
end
