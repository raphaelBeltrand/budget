class Mutations::SetPreviousMonth < Mutations::BaseMutation
    field :errors, [String], null: false
  
    def resolve(params)
        current_user = context[:current_user]
        current_user.selected_month = 
            if (current_user.selected_month == 1) 
                12 
            else 
                current_user.selected_month - 1 
            end
        if current_user.selected_month == 12
            current_user.selected_year = current_user.selected_year - 1
        end

        if current_user.save
            {
                errors: [],
            }
        else
            {
                errors: current_user.errors.full_messages
            }
        end
    end
  end
  