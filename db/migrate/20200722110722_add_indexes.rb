class AddIndexes < ActiveRecord::Migration[6.0]
  def change
    add_index :one_time_entries, [:year, :month, :user_id]
    add_index :monthly_budgets, [:year, :month, :user_id]
  end
end
