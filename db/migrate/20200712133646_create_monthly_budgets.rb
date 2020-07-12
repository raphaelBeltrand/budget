class CreateMonthlyBudgets < ActiveRecord::Migration[6.0]
  def change
    create_table :monthly_budgets do |t|
      t.uuid :uuid, null: false, default: -> { "uuid_generate_v4()" }
      t.float :value, null: false
      t.integer :month, null: false
      t.integer :year, null: false
      
      t.belongs_to :user, type: :uuid, index: true

      t.timestamps
    end
  end
end
