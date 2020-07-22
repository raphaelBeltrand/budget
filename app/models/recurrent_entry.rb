class RecurrentEntry < ApplicationRecord
    self.primary_key = :uuid

    belongs_to :parent_entry, optional: true
    belongs_to :user

    # Predicate to check if recurring entry is on the periodicity range of the given month and year
    scope :on_period, -> (month) { where("(MOD(start_month - ?, periodicity) = 0)", month) }
end
