require "test_helper"

class RegistrationsControllerTest < ActionDispatch::IntegrationTest
  test "create account screen renders for signed-out visitors" do
    get sign_up_url
    assert_response :success
    assert_select "form[action='/sign_up']"
    assert_select ".c-auth-card__title", text: "Claim your handle."
  end

  test "creating an account signs the new member in and sends a confirmation email" do
    assert_difference "User.count", 1 do
      assert_enqueued_emails 1 do
        post sign_up_path, params: {
          handle: "freshmint", display_name: "Fresh Mint",
          email: "fresh@example.com", password: "secret123", password_confirmation: "secret123"
        }
      end
    end
    assert_redirected_to root_path
    # immediately able to reach a gated action
    get new_submission_path
    assert_response :success
  end

  test "invalid registration is rejected" do
    assert_no_difference "User.count" do
      post sign_up_path, params: { handle: "bad handle", email: "x@example.com", password: "secret123", password_confirmation: "secret123" }
    end
    assert_redirected_to sign_up_path
  end
end
