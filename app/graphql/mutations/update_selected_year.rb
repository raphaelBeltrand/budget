class Mutations::UpdateSelectedYear < Mutations::BaseMutation
    argument :year, Integer, required: true
  
    field :year, Integer, null: false
    field :errors, [String], null: false
  
    def resolve(params)
        current_user = context[:current_user]
        current_user.selected_year = params[:year]

        if current_user.save
            {
                year: params[:year],
                errors: [],
            }
        else
            {
                year: params[:year],
                errors: current_user.errors.full_messages
            }
        end
    end
  end
  