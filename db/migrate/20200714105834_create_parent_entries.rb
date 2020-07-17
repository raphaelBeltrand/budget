class CreateParentEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :parent_entries do |t|
      t.uuid :uuid, null: false, default: -> { "uuid_generate_v4()" }
      t.string :label

      t.timestamps

      add_reference :recurrent_entries, :parent_entry, type: :uuid, index: true
    end

  end
end
