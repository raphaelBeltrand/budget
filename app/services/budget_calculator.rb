class BudgetCalculator
    attr_accessor :current_user
    attr_accessor :within_time_range_predicate
    current_user = nil

    # Predicate to check if recurring entry is within the range of given month and year
    within_time_range_predicate = "(start_year < :year OR (start_year = :year AND start_month <= :month)) AND (end_year > :year OR (end_year = :year AND end_month >= :month))"

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
                    budget.assign_attributes(user: current_user, month: month, year: year, value: 0)
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
                .where(within_time_range_predicate, {year: year, month: month})
                .on_period(month)
                .pluck(:value).sum +
            OneTimeEntry.where(kind: "positive", user: current_user).where("year = ? AND month = ?", year, month).pluck(:value).sum
    end

    # Compute the total outgoing money from recurring and one time entries on the current loop month
    def compute_outcome(year, month)
        RecurrentEntry.where(kind: "negative", user: current_user)
                .where(within_time_range_predicate, {year: year, month: month})
                .on_period(month)
                .pluck(:value).sum +
            OneTimeEntry.where(kind: "negative", user: current_user).where("year = ? AND month = ?", year, month).pluck(:value).sum
    end

  end