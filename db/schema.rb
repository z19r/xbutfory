# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2026_07_01_092009) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.bigint "record_id", null: false
    t.string "record_type", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.string "content_type"
    t.datetime "created_at", null: false
    t.string "filename", null: false
    t.string "key", null: false
    t.text "metadata"
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "categories", force: :cascade do |t|
    t.string "color_token"
    t.datetime "created_at", null: false
    t.string "description"
    t.integer "entries_count", default: 0, null: false
    t.string "name", null: false
    t.string "short_code"
    t.string "slug", null: false
    t.datetime "updated_at", null: false
    t.index ["slug"], name: "index_categories_on_slug", unique: true
  end

  create_table "digest_subscriptions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.datetime "updated_at", null: false
    t.index "lower((email)::text)", name: "index_digest_subscriptions_on_lower_email", unique: true
  end

  create_table "entries", force: :cascade do |t|
    t.string "category"
    t.datetime "created_at", null: false
    t.text "description"
    t.string "name"
    t.boolean "nsfw", default: false, null: false
    t.bigint "product_id"
    t.text "reviewer_note"
    t.string "slug", null: false
    t.string "sponsored"
    t.string "stamp"
    t.string "status", default: "live", null: false
    t.string "tagline"
    t.string "tier", default: "free", null: false
    t.datetime "updated_at", null: false
    t.string "url"
    t.bigint "user_id", null: false
    t.integer "votes_count", default: 0, null: false
    t.text "why"
    t.string "x", null: false
    t.string "y", null: false
    t.index ["category"], name: "index_entries_on_category"
    t.index ["created_at"], name: "index_entries_on_created_at"
    t.index ["product_id"], name: "index_entries_on_product_id"
    t.index ["slug"], name: "index_entries_on_slug", unique: true
    t.index ["user_id"], name: "index_entries_on_user_id"
  end

  create_table "payments", force: :cascade do |t|
    t.integer "amount_cents", default: 0, null: false
    t.string "coupon_code"
    t.datetime "created_at", null: false
    t.string "currency", default: "usd", null: false
    t.bigint "entry_id", null: false
    t.string "status", default: "pending", null: false
    t.string "stripe_payment_intent"
    t.string "stripe_session_id"
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["entry_id"], name: "index_payments_on_entry_id"
    t.index ["stripe_session_id"], name: "index_payments_on_stripe_session_id", unique: true
    t.index ["user_id"], name: "index_payments_on_user_id"
  end

  create_table "products", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "name", null: false
    t.string "slug", null: false
    t.datetime "updated_at", null: false
    t.string "url"
    t.index "lower((name)::text)", name: "index_products_on_lower_name", unique: true
    t.index ["slug"], name: "index_products_on_slug", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.boolean "admin", default: false, null: false
    t.string "api_key", null: false
    t.string "avatar_url"
    t.text "bio"
    t.datetime "confirmed_at"
    t.datetime "created_at", null: false
    t.boolean "digest_opt_in", default: true, null: false
    t.string "display_name"
    t.string "email", null: false
    t.string "handle", null: false
    t.boolean "milestone_notifications", default: true, null: false
    t.string "password_digest", null: false
    t.boolean "reply_notifications", default: true, null: false
    t.datetime "updated_at", null: false
    t.index "lower((email)::text)", name: "index_users_on_lower_email", unique: true
    t.index "lower((handle)::text)", name: "index_users_on_lower_handle", unique: true
    t.index ["api_key"], name: "index_users_on_api_key", unique: true
  end

  create_table "votes", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "entry_id", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["entry_id"], name: "index_votes_on_entry_id"
    t.index ["user_id", "entry_id"], name: "index_votes_on_user_id_and_entry_id", unique: true
    t.index ["user_id"], name: "index_votes_on_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "entries", "products"
  add_foreign_key "entries", "users"
  add_foreign_key "payments", "entries"
  add_foreign_key "payments", "users"
  add_foreign_key "votes", "entries"
  add_foreign_key "votes", "users"
end
