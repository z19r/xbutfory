class RegistrationsController < ApplicationController
  def new
    redirect_to root_path, notice: "Account creation coming soon."
  end
end
