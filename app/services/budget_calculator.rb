class BudgetCalculator
    def initialize

    end
  
    def call
        @current_user = User.first

        startingMonth = Time.now.month
        startingYear = Time.now.year
        lastValue = 0

        Array(startingYear..2030).each do |year|
            Array(1..12).each do |month|
                if (year == startingYear && month < startingMonth)
                    next 
                end
                income = 0
                outcome = 0
                RecurrentEntry.where(kind: "positive", user: @current_user).where("year < ? OR (year = ? AND month <= ?)", startingYear, startingYear, startingMonth).map{|e| income += e.value}
                OneTimeEntry.where(kind: "positive", user: @current_user).where("year < ? OR (year = ? AND month <= ?)", year, year, month).map{|e| income += e.value}
                RecurrentEntry.where(kind: "negative", user: @current_user).where("year < ? OR (year = ? AND month <= ?)", startingYear, startingYear, startingMonth).map{|e| outcome += e.value}
                OneTimeEntry.where(kind: "negative", user: @current_user).where("year < ? OR (year = ? AND month <= ?)", year, year, month).map{|e| outcome += e.value}

                budget = MonthlyBudget.find_or_create_by(month: month, year: year, user: @current_user) do |budget|
                    budget.user = @current_user
                    budget.month = month
                    budget.year = year
                end

                budget.value = lastValue + income - outcome
                lastValue = budget.value

                budget.save!
            end
        end
    end
  end