require 'test_helper'

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :headless_chrome, screen_size: [1400, 900]

  # Sign in through the real form — system tests exercise the whole UI stack,
  # so no request-level shortcuts here.
  def sign_in_through_ui(user, password: 'password')
    visit sign_in_path
    fill_in 'login', with: user.email
    fill_in 'password', with: password
    # Scoped: the top nav's SIGN IN link also smart-matches "Sign in".
    within('.c-auth-form') { click_on 'Sign in' }
    # Block until the redirect lands (signed-in nav carries the sign-out
    # form, hidden inside the account dropdown) — otherwise a caller's next
    # visit can interrupt the in-flight POST and drop the session.
    assert_selector "form[action='#{sign_out_path}']", visible: :all
  end
end
