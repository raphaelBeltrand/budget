module Types
    class MutationType < Types::BaseObject
      field :update_selected_month, mutation: Mutations::UpdateSelectedMonth
      field :update_selected_year, mutation: Mutations::UpdateSelectedYear

      field :new_exceptional_entry, mutation: Mutations::NewExceptionalEntry
      field :update_exceptional_entry, mutation: Mutations::UpdateExceptionalEntry
    end
  end
  