class ParentEntry < ApplicationRecord
    self.primary_key = :uuid

    has_many :recurrent_entries, dependent: :destroy
end
