class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    enable_extension "uuid-ossp"
    
    create_table :users do |t|
      t.uuid :uuid, null: false, default: -> { "uuid_generate_v4()" }
      t.string :name, null: false
      t.string :telegram_id, null: false, unique: true
      t.string :telegram_username, null: true
      t.string :avatar, null: true
      t.boolean :is_admin, null: false, default: false
      t.boolean :is_member, null: false, default: false
      t.boolean :is_applicant, null: false, default: false

      t.timestamps
    end
  end
end
