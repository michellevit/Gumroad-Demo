class ApplicationController < ActionController::Base
    def react_app
        render file: Rails.root.join('public', 'build', 'static', 'index.html')
    end
  end