module Types
  class RecurrentEntryType < Types::BaseObject
    description "recurrent entry object"
    field :id, ID, null: false
    field :label, String, null: false
    field :value, Integer, null: false
  end
end
