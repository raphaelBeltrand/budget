class AddPeriodicityToRecurrentEntries < ActiveRecord::Migration[6.0]
  def change
    add_column :recurrent_entries, :periodicity, :integer, null: false, default: 1
  end
end
