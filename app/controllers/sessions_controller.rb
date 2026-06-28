class SessionsController < ApplicationController
  def new
    redirect_to root_path, notice: "Sign in coming soon."
  end
end
