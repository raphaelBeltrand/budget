class CleanUpUser < ActiveRecord::Migration[6.0]
  def change
    remove_column :users, :name, :string
    remove_column :users, :telegram_id, :string
    remove_column :users, :telegram_username, :string
    remove_column :users, :avatar, :string
    remove_column :users, :is_admin, :boolean
    remove_column :users, :is_member, :boolean
    remove_column :users, :is_applicant, :boolean
  end
end
