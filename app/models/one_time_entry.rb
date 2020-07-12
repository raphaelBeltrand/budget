class OneTimeEntry < ApplicationRecord
    self.primary_key = :uuid

    belongs_to :user
end
