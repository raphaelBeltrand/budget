module Types
  class UserType < Types::BaseObject
    description "User object"
    field :id, ID, null: false
    field :telegram_id, String, null: false
    field :name, String, null: false
    field :is_admin, Boolean, null: false
    field :is_member, Boolean, null: false
    field :is_applicant, Boolean, null: false
  end
end
