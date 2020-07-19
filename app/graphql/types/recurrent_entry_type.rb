module Types
  class RecurrentEntryType < Types::BaseObject
    description "recurrent entry object"
    field :id, ID, null: false
    field :kind, String, null: false
    field :label, String, null: false
    field :value, Integer, null: false
    field :periodicity, Integer, null: false
    field :parent_entry, ParentEntryType, null: true
    field :start_month, Integer, null: false
    field :start_year, Integer, null: false
    field :end_month, Integer, null: false
    field :end_year, Integer, null: false
  end
end
