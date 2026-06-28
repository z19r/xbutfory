# Minimal session-cookie authentication (Rails 8 style). The signed-in member is
# kept in session[:user_id] and exposed as current_user / Current.user.
module Authentication
  extend ActiveSupport::Concern

  included { helper_method :current_user, :user_signed_in? }

  private

  def current_user
    return @current_user if defined?(@current_user)

    @current_user = Current.user = User.find_by(id: session[:user_id])
  end

  def user_signed_in?
    current_user.present?
  end

  # Gate an action behind a session; remember where we were headed and bounce to sign-in.
  def require_authentication
    return if user_signed_in?

    session[:return_to] = request.fullpath if request.get? || request.head?
    redirect_to sign_in_path, alert: "Please sign in to continue."
  end

  def sign_in(user)
    return_to = session[:return_to]
    reset_session
    session[:return_to] = return_to
    session[:user_id] = user.id
    @current_user = Current.user = user
  end

  def sign_out
    reset_session
    @current_user = Current.user = nil
  end

  def after_sign_in_path
    session.delete(:return_to) || root_path
  end
end
