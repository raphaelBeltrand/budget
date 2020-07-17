class Mutations::UpdateSelectedMonth < Mutations::BaseMutation
    argument :month, Integer, required: true

    field :month, Integer, null: false
    field :errors, [String], null: false
  
    def resolve(params)
        current_user = context[:current_user]
        current_user.selected_month = params[:month]

        if current_user.save
            {
                month: params[:month],
                errors: [],
            }
        else
            {
                month: params[:month],
                errors: current_user.errors.full_messages
            }
        end
    end
  end
  