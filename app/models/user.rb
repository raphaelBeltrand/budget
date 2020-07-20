class User < ApplicationRecord
    # Include default devise modules. Others available are:
    # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
    devise :database_authenticatable, :registerable,
          :rememberable, :validatable, :trackable
    self.primary_key = :uuid

    validates :username, presence: true, uniqueness: { case_sensitive: false }
    
    has_many :sessions, dependent: :destroy
    has_many :recurrent_entries, dependent: :destroy
    has_many :one_time_entries, dependent: :destroy
    has_many :monthly_budgets, dependent: :destroy

    def self.find_for_database_authentication(warden_conditions)
      conditions = warden_conditions.dup
      if login = conditions.delete(:login)
        where(conditions.to_h).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
      elsif conditions.has_key?(:username) || conditions.has_key?(:email)
        where(conditions.to_h).first
      end
    end

    def login
      @login || self.username || self.email
    end
end
