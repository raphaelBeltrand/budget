class Mutations::UpdateExceptionalEntry < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :label, String, required: true
    argument :value, Float, required: true
    argument :kind, String, required: true
    argument :month, Integer, required: true
    argument :year, Integer, required: true

    field :entry, Types::OneTimeEntryType, null: false
    field :errors, [String], null: false
  
    def resolve(params)
        current_user = context[:current_user]
        entry = OneTimeEntry.find(params[:id])

        entry.assign_attributes(params)

        if entry.save
            returnVal = {
                entry: entry,
                errors: [],
            }
        else
            returnVal = {
                entry: entry,
                errors: entry.errors.full_messages
            }
        end

        BudgetCalculator.new({current_user: context[:current_user]}).call

        returnVal
    end
  end
  