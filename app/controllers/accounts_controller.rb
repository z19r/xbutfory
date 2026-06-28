class AccountsController < ApplicationController
  before_action :require_authentication

  def settings
    @user = current_user
  end

  def update_profile
    @user = current_user
    if @user.update(profile_params)
      redirect_to account_settings_path, notice: "Profile saved."
    else
      render :settings, status: :unprocessable_entity
    end
  end

  # Email and/or password. Changing the password requires the current one.
  def update_security
    @user = current_user

    if params[:password].present?
      unless @user.authenticate(params[:current_password].to_s)
        @user.errors.add(:current_password, "is incorrect")
        return render :settings, status: :unprocessable_entity
      end
      @user.password = params[:password]
      @user.password_confirmation = params[:password_confirmation]
    end

    @user.email = params[:email] if params.key?(:email)

    if @user.save
      redirect_to account_settings_path, notice: "Account updated."
    else
      render :settings, status: :unprocessable_entity
    end
  end

  def update_notifications
    @user = current_user
    @user.update(notification_params)
    redirect_to account_settings_path, notice: "Notification preferences saved."
  end

  def regenerate_api_key
    current_user.update_column(:api_key, SecureRandom.hex(24))
    redirect_to account_settings_path, notice: "🔑 New API key generated."
  end

  # Danger zone: deleting an account withdraws all its listings. We reassign them to
  # the placeholder @legacy owner (status withdrawn) so the byline history survives,
  # then destroy the member and end the session.
  def destroy
    user = current_user
    legacy = User.legacy
    user.entries.update_all(user_id: legacy.id, status: "withdrawn") if legacy
    user.destroy
    sign_out
    redirect_to root_path, notice: "Your account is gone. Your listings have been withdrawn."
  end

  STATUS_FILTERS = %w[all live pending needs_edits withdrawn].freeze

  def submissions
    scope = current_user.entries
    @counts = STATUS_FILTERS.index_with do |status|
      status == "all" ? scope.count : scope.where(status: status).count
    end
    @filter = STATUS_FILTERS.include?(params[:status]) ? params[:status] : "all"
    @entries = scope.order(created_at: :desc)
    @entries = @entries.where(status: @filter) unless @filter == "all"
  end

  private

  def profile_params
    params.permit(:display_name, :bio, :avatar_url)
  end

  def notification_params
    {
      digest_opt_in: params[:digest_opt_in] == "1",
      reply_notifications: params[:reply_notifications] == "1",
      milestone_notifications: params[:milestone_notifications] == "1"
    }
  end
end
