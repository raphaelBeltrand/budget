module Types
  class ParentEntryType < Types::BaseObject
    description "Parent entry object"
    field :id, ID, null: false
    field :label, String, null: false
    field :recurrent_entries, [RecurrentEntryType], null: false
  end
end
