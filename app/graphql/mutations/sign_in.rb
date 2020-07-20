class Mutations::SignIn < Mutations::BaseMutation
    argument :username, String, required: true
    argument :password, String, required: true
  
    field :session, Types::SessionType, null: true
    field :errors, [String], null: false
  
    def resolve(params)
      begin
        user = User.find_for_database_authentication(username: params[:username])
      rescue => error
        return GraphQL::ExecutionError.new('unknown_username')
      end
      if user.blank?
        return GraphQL::ExecutionError.new('unknown_username')
      end
      if !user.valid_password?(params[:password])
        return GraphQL::ExecutionError.new('wrong_pwd')
      end

      session = Session.new(user: user)
  
      if session.save
        context[:cookies].signed[:token] = {value: session.uuid, httponly: true, expires: Time.now + 1.month, same_site: :strict}
        {
          session: session,
          errors: [],
        }
      else
        {
          session: nil,
          errors: session.errors.full_messages
        }
      end
    end
  end
  