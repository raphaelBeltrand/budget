class Mutations::SignUp < Mutations::BaseMutation
    argument :username, String, required: true
    argument :password, String, required: true
    argument :password_confirm, String, required: true
    argument :agreement, Boolean, required: true
  
    field :errors, [String], null: false
  
    def resolve(params)
      begin
        user = User.create!(email: "#{params[:username]}@me.com", password: params[:password], username: params[:username])
      rescue => error
        byebug
        return GraphQL::ExecutionError.new("email_exists")
      end

      session = Session.new(user: user)
  
      if session.save
        context[:cookies].signed[:token] = {value: session.uuid, httponly: true, expires: Time.now + 1.month, same_site: :strict}
        {
          errors: [],
        }
      else
        {
          errors: session.errors.full_messages
        }
      end
    end
  end
  