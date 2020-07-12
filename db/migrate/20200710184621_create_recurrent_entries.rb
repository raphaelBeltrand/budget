class CreateRecurrentEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :recurrent_entries do |t|
      t.uuid :uuid, null: false, default: -> { "uuid_generate_v4()" }
      t.integer :value
      t.integer :month
      t.integer :year
      t.string :label

      t.timestamps
    end
  end
end
