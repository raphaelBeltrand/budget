class BudgetCalculator
    attr_accessor :current_user
    current_user = nil

    def initialize(args)
        current_user = args[:current_user]
    end
  
    def call
        startingMonth = Time.now.month
        startingYear = Time.now.year
        lastValue = 0

        Array(startingYear..2030).each do |year|
            Array(1..12).each do |month|
                # If current year, skip to starting month
                if (year == startingYear && month < startingMonth)
                    next 
                end
                
                income = compute_income(year, month)
                outcome = compute_outcome(year, month)

                # Update or create the Budget object for this user and this loop's month/year
                budget = MonthlyBudget.find_or_create_by(month: month, year: year, user: current_user) do |budget|
                    budget.user = current_user
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

    private

    # Compute the total incoming money from recurring and one time entries on the current loop month
    def compute_income(year, month)
        RecurrentEntry.where(kind: "positive", user: current_user)
                .within_time_range(month, year)
                .on_period(month)
                .pluck(:value).sum +
            OneTimeEntry.where(kind: "positive", user: current_user).where("year = ? AND month = ?", year, month).pluck(:value).sum
    end

    # Compute the total outgoing money from recurring and one time entries on the current loop month
    def compute_outcome(year, month)
        RecurrentEntry.where(kind: "negative", user: current_user)
                .within_time_range(month, year)
                .on_period(month)
                .pluck(:value).sum +
            OneTimeEntry.where(kind: "negative", user: current_user).where("year = ? AND month = ?", year, month).pluck(:value).sum
    end

  end