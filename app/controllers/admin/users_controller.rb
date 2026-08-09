# Member management for customer service: search, ban/reinstate, fix a typo'd
# email, re-send the confirmation, push a password reset, grant/revoke admin.
class Admin::UsersController < Admin::BaseController
  STATES = %w[unconfirmed confirmed suspended].freeze

  def index
    @query = params[:q].presence
    @state = params[:state].presence_in(STATES)

    scope = User.order(created_at: :desc)
    scope = scope.search(@query) if @query
    scope = scope.where(state: @state) if @state

    @users = scope.limit(100)
    @counts = User.group(:state).count
  end

  # Ban. Suspension also kills their live sessions (see Authentication) and
  # pulls their live listings off the index.
  def suspend
    user = User.find_by!(handle: params[:id])
    if user == current_user
      return redirect_back_to_index alert: 'You cannot ban yourself.'
    end

    User.transaction do
      user.suspend! if user.may_suspend?
      user.entries.live.find_each { |e| e.withdraw! if e.may_withdraw? }
    end
    redirect_back_to_index notice:
                             "@#{user.handle} is suspended and their " \
                               'listings are pulled.'
  end

  def reinstate
    user = User.find_by!(handle: params[:id])
    user.reinstate! if user.may_reinstate?
    redirect_back_to_index notice:
                             "@#{user.handle} is reinstated. " \
                               'Their listings stay withdrawn until restored.'
  end

  # Fix an email address (typo at sign-up, lost inbox). The new address is
  # unverified, so a fresh confirmation email goes out immediately.
  def reset_email
    user = User.find_by!(handle: params[:id])
    if user.update(email: params[:email].to_s)
      ConfirmationEmailJob.perform_async(user.id)
      redirect_back_to_index notice:
                               "@#{user.handle}'s email is now " \
                                 "#{user.email} — confirmation sent."
    else
      redirect_back_to_index alert:
                               'That email did not stick: ' +
                                 user.errors.full_messages.to_sentence
    end
  end

  def send_password_reset
    user = User.find_by!(handle: params[:id])
    PasswordResetEmailJob.perform_async(user.id)
    redirect_back_to_index notice:
                             "Password-reset email sent to @#{user.handle}."
  end

  def resend_confirmation
    user = User.find_by!(handle: params[:id])
    if user.confirmed?
      redirect_back_to_index alert: "@#{user.handle} is already confirmed."
      return
    end

    ConfirmationEmailJob.perform_async(user.id)
    redirect_back_to_index notice:
                             "Confirmation email re-sent to @#{user.handle}."
  end

  def toggle_admin
    user = User.find_by!(handle: params[:id])
    if user == current_user
      redirect_back_to_index alert: 'You cannot revoke your own admin bit.'
      return
    end

    user.update!(admin: !user.admin?)
    verb = user.admin? ? 'now has' : 'no longer has'
    redirect_back_to_index notice: "@#{user.handle} #{verb} the admin bit."
  end

  private

  def redirect_back_to_index(**flash)
    redirect_back fallback_location: admin_users_path, **flash
  end
end
