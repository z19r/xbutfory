class AccountsController < ApplicationController
  before_action :require_authentication

  # The full screens are built in Phase D; for now they confirm the route resolves.
  def settings
    redirect_to root_path, notice: "Account settings coming soon."
  end

  def submissions
    redirect_to root_path, notice: "Manage submissions coming soon."
  end
end
