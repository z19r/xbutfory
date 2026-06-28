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

ActiveRecord::Schema[8.1].define(version: 2026_06_28_091240) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

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

  create_table "entries", force: :cascade do |t|
    t.string "category"
    t.datetime "created_at", null: false
    t.text "description"
    t.string "name"
    t.boolean "nsfw", default: false, null: false
    t.string "slug", null: false
    t.string "sponsored"
    t.string "stamp"
    t.string "submitter", null: false
    t.string "tagline"
    t.string "tier", default: "free", null: false
    t.datetime "updated_at", null: false
    t.string "url"
    t.integer "votes_count", default: 0, null: false
    t.text "why"
    t.string "x", null: false
    t.string "y", null: false
    t.index ["category"], name: "index_entries_on_category"
    t.index ["created_at"], name: "index_entries_on_created_at"
    t.index ["slug"], name: "index_entries_on_slug", unique: true
  end

  create_table "votes", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.bigint "entry_id", null: false
    t.datetime "updated_at", null: false
    t.string "voter_ip", null: false
    t.index ["entry_id", "voter_ip"], name: "index_votes_on_entry_id_and_voter_ip", unique: true
    t.index ["entry_id"], name: "index_votes_on_entry_id"
  end

  add_foreign_key "votes", "entries"
end
