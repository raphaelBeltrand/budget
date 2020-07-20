class Mutations::DeleteAccount < Mutations::BaseMutation
    field :errors, [String], null: false
  
    def resolve
      user = context[:current_user]
  
      if user.destroy
        {
          errors: [],
        }
      else
        {
          errors: user.errors.full_messages
        }
      end
    end
  end
  