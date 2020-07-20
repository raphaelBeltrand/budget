module Types
  class MonthlyBudgetType < Types::BaseObject
    description "monthly budget object"
    
    field :id, ID, null: false
    field :value, Integer, null: false
    field :year, Integer, null: false
    field :month, Integer, null: false
  end
end
