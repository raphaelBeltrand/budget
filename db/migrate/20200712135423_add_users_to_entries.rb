class AddUsersToEntries < ActiveRecord::Migration[6.0]
  def change
    add_reference :recurrent_entries, :user, index: true, type: :uuid
    add_reference :one_time_entries, :user, index: true, type: :uuid

  end
end
