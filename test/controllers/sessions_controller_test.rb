require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "sign in screen renders for signed-out visitors" do
    get sign_in_url
    assert_response :success
    assert_select "form[action='/sign_in']"
    assert_select ".c-auth-card__title", text: "Welcome back."
  end

  test "sign in screen redirects members who are already signed in" do
    sign_in_as(users(:member))
    get sign_in_url
    assert_redirected_to root_path
  end

  test "valid credentials start a session" do
    post sign_in_path, params: { email: users(:member).email, password: "password" }
    assert_redirected_to root_path
    # a gated action now succeeds without bouncing
    get new_submission_path
    assert_response :success
  end

  test "bad credentials are rejected" do
    post sign_in_path, params: { email: users(:member).email, password: "wrong" }
    assert_redirected_to sign_in_path
    follow_redirect!
    # still gated
    get new_submission_path
    assert_redirected_to sign_in_path
  end

  test "sign out ends the session" do
    sign_in_as(users(:member))
    delete sign_out_path
    assert_redirected_to root_path
    get new_submission_path
    assert_redirected_to sign_in_path
  end
end
