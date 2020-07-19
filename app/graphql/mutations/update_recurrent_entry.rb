class Mutations::UpdateRecurrentEntry < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :label, String, required: true
    argument :value, Float, required: true
    argument :kind, String, required: true
    argument :start_month, Integer, required: true
    argument :start_year, Integer, required: true
    argument :end_month, Integer, required: true
    argument :end_year, Integer, required: true
    argument :periodicity, Integer, required: true

    field :entry, Types::RecurrentEntryType, null: false
    field :errors, [String], null: false
  
    def resolve(params)
        current_user = context[:current_user]
        entry = RecurrentEntry.find(params[:id])

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
  