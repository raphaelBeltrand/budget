module Types
    class MutationType < Types::BaseObject
      field :update_selected_month, mutation: Mutations::UpdateSelectedMonth
      field :update_selected_year, mutation: Mutations::UpdateSelectedYear

      # field :set_next_month, mutation: Mutations::SetNextMonth
      # field :set_previous_month, mutation: Mutations::SetPreviousMonth

      field :new_exceptional_entry, mutation: Mutations::NewExceptionalEntry
      field :update_exceptional_entry, mutation: Mutations::UpdateExceptionalEntry

      field :new_recurrent_entry, mutation: Mutations::NewRecurrentEntry
      field :update_recurrent_entry, mutation: Mutations::UpdateRecurrentEntry

      field :delete_recurrent_entry, mutation: Mutations::DeleteRecurrentEntry
      field :delete_exceptional_entry, mutation: Mutations::DeleteExceptionalEntry

    end
  end
  