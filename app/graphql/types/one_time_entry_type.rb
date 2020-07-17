module Types
  class OneTimeEntryType < Types::BaseObject
    description "OneTime entry object"
    field :id, ID, null: false
    field :label, String, null: false
    field :value, Integer, null: false
    field :month, Integer, null: false
    field :year, Integer, null: false
  end
end
