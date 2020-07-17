class RecurrentEntry < ApplicationRecord
    self.primary_key = :uuid

    belongs_to :parent_entry
    belongs_to :user
end
