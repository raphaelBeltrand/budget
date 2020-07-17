module Types
  class UserType < Types::BaseObject
    description "User object"
    field :id, ID, null: false
    field :name, String, null: false
    field :selected_month, Integer, null: false
    field :selected_year, Integer, null: false
  end
end
