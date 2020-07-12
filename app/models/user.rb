class User < ApplicationRecord
    self.primary_key = :uuid

    has_many :sessions, dependent: :destroy
    has_many :recurrent_entries, dependent: :destroy
    has_many :one_time_entries, dependent: :destroy
    has_many :month_budgets, dependent: :destroy
end
