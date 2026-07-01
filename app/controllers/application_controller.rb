class ApplicationController < ActionController::Base
  include Authentication

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes

  private

  # After Dark (NSFW listings) is a members-only view: the cookie is only
  # honored while signed in, so a forged cookie can't reveal NSFW to guests.
  def after_dark?
    current_user.present? && cookies[:after_dark] == '1'
  end
  helper_method :after_dark?
end
