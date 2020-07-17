class BudgetCalculator
    def initialize

    end
  
    def call
        current_user = context[:current_user]

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
                RecurrentEntry.where(kind: "positive", user: current_user)
                    .where("(start_year < ? OR (start_year = ? AND start_month <= ?)) AND (end_year > ? OR (end_year = ? AND end_month >= ?))", 
                        year, year, month, year, year, month)
                    .map{|e| income += e.value}
                OneTimeEntry.where(kind: "positive", user: current_user).where("year = ? AND month = ?", year, month).map{|e| income += e.value}
                RecurrentEntry.where(kind: "negative", user: current_user)
                    .where("(start_year < ? OR (start_year = ? AND start_month <= ?)) AND (end_year > ? OR (end_year = ? AND end_month >= ?)) ",
                        year, year, month, year, year, month)
                    .map{|e| outcome += e.value}
                OneTimeEntry.where(kind: "negative", user: current_user).where("year = ? AND month = ?", year, month).map{|e| outcome += e.value}

                budget = MonthlyBudget.find_or_create_by(month: month, year: year, user: current_user) do |budget|
                    budget.user = current_user
                    budget.month = month
                    budget.year = year
                    budget.value = 0
                end

                budget.value = lastValue + income - outcome
                lastValue = budget.value
                puts "#{month}/#{year}"
                puts income
                puts outcome
                puts lastValue
                budget.save!
            end
        end
    end
  end