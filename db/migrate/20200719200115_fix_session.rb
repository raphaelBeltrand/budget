class FixSession < ActiveRecord::Migration[6.0]
  def change
    drop_table :sessions
    create_table :sessions do |t|
      t.uuid :uuid, null: false, default: -> { "uuid_generate_v4()" }
      t.belongs_to :user, type: :uuid
      
      t.timestamps
    end
  end
end
