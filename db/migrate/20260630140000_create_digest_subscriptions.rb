class CreateDigestSubscriptions < ActiveRecord::Migration[8.1]
  def change
    create_table :digest_subscriptions do |t|
      t.string :email, null: false

      t.timestamps
    end

    add_index :digest_subscriptions, 'lower(email)', unique: true, name: 'index_digest_subscriptions_on_lower_email'
  end
end
