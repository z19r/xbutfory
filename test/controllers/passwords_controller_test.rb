require "test_helper"

class PasswordsControllerTest < ActionDispatch::IntegrationTest
  test "request form renders" do
    get new_password_reset_path
    assert_response :success
    assert_select ".c-auth-card__title", text: "Forgot it? Happens."
  end

  test "requesting a reset for a known email enqueues the mail" do
    assert_enqueued_emails 1 do
      post password_reset_path, params: { email: users(:member).email }
    end
    assert_redirected_to sign_in_path
  end

  test "requesting a reset for an unknown email is silent (no leak, no mail)" do
    assert_no_enqueued_emails do
      post password_reset_path, params: { email: "nobody@example.com" }
    end
    assert_redirected_to sign_in_path
  end

  test "edit renders with a valid token" do
    token = users(:member).generate_token_for(:password_reset)
    get edit_password_reset_path(token: token)
    assert_response :success
    assert_select ".c-auth-card__handle", text: "@member"
  end

  test "edit redirects on an invalid token" do
    get edit_password_reset_path(token: "garbage")
    assert_redirected_to new_password_reset_path
  end

  test "updating with a valid token sets the new password" do
    token = users(:member).generate_token_for(:password_reset)
    patch update_password_reset_path(token: token), params: { password: "brandnew1", password_confirmation: "brandnew1" }
    assert_redirected_to sign_in_path
    assert users(:member).reload.authenticate("brandnew1")
  end

  test "updating with an invalid token is rejected" do
    patch update_password_reset_path(token: "garbage"), params: { password: "brandnew1", password_confirmation: "brandnew1" }
    assert_redirected_to new_password_reset_path
    assert users(:member).reload.authenticate("password"), "password unchanged"
  end
end
