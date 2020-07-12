class MonthlyBudget < ApplicationRecord
    self.primary_key = :uuid

    belongs_to :user
end
