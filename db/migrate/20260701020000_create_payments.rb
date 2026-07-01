class CreatePayments < ActiveRecord::Migration[8.1]
  def change
    create_table :payments do |t|
      t.references :entry, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.integer :amount_cents, null: false, default: 0
      t.string :currency, null: false, default: 'usd'
      t.string :status, null: false, default: 'pending'
      t.string :stripe_session_id
      t.string :stripe_payment_intent
      t.string :coupon_code

      t.timestamps
    end

    add_index :payments, :stripe_session_id, unique: true
  end
end
