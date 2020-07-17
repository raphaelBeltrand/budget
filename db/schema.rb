# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_07_14_120244) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "monthly_budgets", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
    t.float "value", null: false
    t.integer "month", null: false
    t.integer "year", null: false
    t.uuid "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_monthly_budgets_on_user_id"
  end

  create_table "one_time_entries", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
    t.integer "value"
    t.integer "periodicity"
    t.string "label"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "kind"
    t.uuid "user_id"
    t.integer "month"
    t.integer "year"
    t.index ["user_id"], name: "index_one_time_entries_on_user_id"
  end

  create_table "parent_entries", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
    t.string "label"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "recurrent_entries", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
    t.integer "value"
    t.integer "start_month"
    t.integer "start_year"
    t.string "label"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "kind"
    t.uuid "user_id"
    t.integer "end_year"
    t.integer "end_month"
    t.uuid "parent_entry_id"
    t.index ["parent_entry_id"], name: "index_recurrent_entries_on_parent_entry_id"
    t.index ["user_id"], name: "index_recurrent_entries_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
    t.uuid "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.uuid "uuid", default: -> { "uuid_generate_v4()" }, null: false
    t.string "name", null: false
    t.string "telegram_id", null: false
    t.string "telegram_username"
    t.string "avatar"
    t.boolean "is_admin", default: false, null: false
    t.boolean "is_member", default: false, null: false
    t.boolean "is_applicant", default: false, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "selected_month", default: 7
    t.integer "selected_year", default: 2020
  end

end
