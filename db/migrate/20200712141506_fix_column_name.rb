class FixColumnName < ActiveRecord::Migration[6.0]
  def change
    remove_column :one_time_entries, :start_month, :integer
    remove_column :one_time_entries, :start_year, :integer
    add_column :one_time_entries, :month, :integer
    add_column :one_time_entries, :year, :integer
  end
end
