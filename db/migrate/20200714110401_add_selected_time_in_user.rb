class AddSelectedTimeInUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :selected_month, :integer, default: Time.now.month
    add_column :users, :selected_year, :integer, default: Time.now.year
  end
end
