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
      current_user = context[:current_user]
      RecurrentEntry.where(kind: args[:kind]).where("(start_year < ? OR (start_year = ? AND start_month <= ?)) AND (end_year > ? OR (end_year = ? AND end_month >= ?)) ", 
          current_user.selected_year, current_user.selected_year, current_user.selected_month, current_user.selected_year, current_user.selected_year, current_user.selected_month)
    end

    field :exceptional_entries, [OneTimeEntryType], null: true do
      argument :kind, String, required: true
    end
    def exceptional_entries(args)
      current_user = context[:current_user]
      OneTimeEntry.where(kind: args[:kind], month: current_user.selected_month, year: current_user.selected_year)
    end

    field :monthly_budget, MonthlyBudgetType, null: true
    def monthly_budget
      current_user = context[:current_user]
      MonthlyBudget.find_by(user: current_user, month: current_user.selected_month, year: current_user.selected_year)
    end
  end
end
