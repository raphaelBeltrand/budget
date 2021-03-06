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
      # Predicate to check if recurring entry is within the range of given month and year
      @within_time_range_predicate = "(start_year < :year OR (start_year = :year AND start_month <= :month)) AND (end_year > :year OR (end_year = :year AND end_month >= :month))"

      # Predicate to check if recurring entry is on the periodicity range of the given month and year
      @on_period_predicate = "(MOD(start_month - :month, periodicity) = 0)"
      RecurrentEntry.where(kind: args[:kind], user: current_user)
        .within_time_range(current_user.selected_month, current_user.selected_year)
        .on_period(current_user.selected_month)
    end

    field :exceptional_entries, [OneTimeEntryType], null: true do
      argument :kind, String, required: true
    end
    def exceptional_entries(args)
      current_user = context[:current_user]
      OneTimeEntry.where(kind: args[:kind], month: current_user.selected_month, year: current_user.selected_year, user: current_user)
    end

    field :monthly_budget, MonthlyBudgetType, null: true
    def monthly_budget
      current_user = context[:current_user]
      MonthlyBudget.find_by(month: current_user.selected_month, year: current_user.selected_year, user: current_user)
    end


    field :year_entries, [MonthlyBudgetType], null: true do
      argument :year, Integer, required: true
    end
    def year_entries(args)
      current_user = context[:current_user]
      MonthlyBudget.where(year: args[:year], user: current_user).order(:month)
    end
  end
end
