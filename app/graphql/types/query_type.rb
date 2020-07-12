module Types
  class QueryType < Types::BaseObject
    field :session, SessionType, null: true
    def session
      context[:current_session]
    end

    field :recurring_entries, [RecurrentEntryType], null: true do
      argument :kind, String, required: true
    end
    def recurring_entries(args)
      RecurrentEntry.where(kind: args[:kind])
    end

    field :exceptional_entries, [OneTimeEntryType], null: true do
      argument :kind, String, required: true
    end
    def exceptional_entries(args)
      OneTimeEntry.where(kind: args[:kind])
    end
  end
end
