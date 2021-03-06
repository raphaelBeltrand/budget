class Mutations::SignOut < Mutations::BaseMutation
    field :errors, [String], null: false
  
    def resolve
      session = context[:current_session]
  
      if session.destroy
        {
          errors: [],
        }
      else
        {
          errors: session.errors.full_messages
        }
      end
    end
  end
  