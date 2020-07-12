class CreateOneTimeEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :one_time_entries do |t|
      t.uuid :uuid, null: false, default: -> { "uuid_generate_v4()" }
      t.integer :value
      t.integer :start_month
      t.integer :start_year
      t.integer :periodicity
      t.string :label

      t.timestamps
    end
  end
end
