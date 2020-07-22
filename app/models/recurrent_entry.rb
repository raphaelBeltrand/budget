class RecurrentEntry < ApplicationRecord
    self.primary_key = :uuid

    belongs_to :parent_entry, optional: true
    belongs_to :user

    # Predicate to check if recurring entry is within the range of given month and year
    scope :within_time_range, -> (variables) { 
        where("(start_year < :year OR (start_year = :year AND start_month <= :month)) AND (end_year > :year OR (end_year = :year AND end_month >= :month))", variables)
    }

    # Predicate to check if recurring entry is on the periodicity range of the given month and year
    scope :on_period, -> (month) { where("(MOD(start_month - ?, periodicity) = 0)", month)}
end
