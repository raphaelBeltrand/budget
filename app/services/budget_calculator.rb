class BudgetCalculator
    def initialize(args)
        @current_user = args[:current_user]
        # Predicate to check if recurring entry is within the range of given month and year
        @within_time_range_predicate = "(start_year < :year OR (start_year = :year AND start_month <= :month)) AND (end_year > :year OR (end_year = :year AND end_month >= :month))"

        # Predicate to check if recurring entry is on the periodicity range of the given month and year
        @on_period_predicate = "(MOD(start_month - :month, periodicity) = 0)"
    end
  
    def call
        startingMonth = Time.now.month
        startingYear = Time.now.year
        lastValue = 0

        Array(startingYear..2040).each do |year|
            Array(1..12).each do |month|
                if (year == startingYear && month < startingMonth)
                    next 
                end
                
                # Compute the total incoming money from recurring and one time entries on the current loop month
                income = 0
                RecurrentEntry.where(kind: "positive", user: @current_user)
                    .where(@within_time_range_predicate, {year: year, month: month})
                    .where(@on_period_predicate, {month: month})
                    .map{|e| income += e.value}
                OneTimeEntry.where(kind: "positive", user: @current_user).where("year = ? AND month = ?", year, month).map{|e| income += e.value}
             
                # Compute the total outgoing money from recurring and one time entries on the current loop month
                outcome = 0
                RecurrentEntry.where(kind: "negative", user: @current_user)
                    .where(@within_time_range_predicate, {year: year, month: month})
                    .where(@on_period_predicate, {month: month})
                    .map{|e| outcome += e.value}
                OneTimeEntry.where(kind: "negative", user: @current_user).where("year = ? AND month = ?", year, month).map{|e| outcome += e.value}

                # Update or create the Budget object for this user and this loop's month/year
                budget = MonthlyBudget.find_or_create_by(month: month, year: year, user: @current_user) do |budget|
                    budget.user = @current_user
                    budget.month = month
                    budget.year = year
                    budget.value = 0
                end

                budget.value = lastValue + income - outcome
                lastValue = budget.value
                budget.save!
            end
        end
    end
  end