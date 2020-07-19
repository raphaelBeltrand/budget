class RecurrentEntry < ApplicationRecord
    self.primary_key = :uuid

    belongs_to :parent_entry, optional: true
    belongs_to :user
end
