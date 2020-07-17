class FixColumnNameRecurring < ActiveRecord::Migration[6.0]
  def change
    rename_column :recurrent_entries, :year, :start_year
    rename_column :recurrent_entries, :month, :start_month
    add_column :recurrent_entries, :end_year, :integer
    add_column :recurrent_entries, :end_month, :integer
  end
end
