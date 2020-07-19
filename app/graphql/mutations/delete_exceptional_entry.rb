class Mutations::DeleteExceptionalEntry < Mutations::BaseMutation
    argument :id, ID, required: true

    field :errors, [String], null: false
  
    def resolve(params)
        entry = OneTimeEntry.find(params[:id])

        if entry.destroy
            returnVal = {
                errors: [],
            }
        else
            returnVal = {
                errors: entry.errors.full_messages
            }
        end

        BudgetCalculator.new({current_user: context[:current_user]}).call

        returnVal
    end
  end
  