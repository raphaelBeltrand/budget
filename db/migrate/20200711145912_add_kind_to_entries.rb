class AddKindToEntries < ActiveRecord::Migration[6.0]
  def change
    add_column :recurrent_entries, :kind, :string
    add_column :one_time_entries, :kind, :string
  end
end
