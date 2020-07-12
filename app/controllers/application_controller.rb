class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :set_csrf_token, if: :valid_request_origin?

  before_action :initialize_meta

    def index
    end

    protected

    def initialize_meta

    end
  
    def set_csrf_token
      cookies["csrf-token"] = {
        value: form_authenticity_token,
        same_site: :strict
      }
    end
  
    def not_authorized
      render "errors/403", status: 403
    end
end
