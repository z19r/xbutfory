require "test_helper"

class ConfirmationsControllerTest < ActionDispatch::IntegrationTest
  test "confirms with a valid token" do
    user = users(:member)
    assert_not user.confirmed?
    token = user.generate_token_for(:email_confirmation)
    get confirm_email_path(token: token)
    assert_redirected_to root_path
    assert user.reload.confirmed?
  end

  test "rejects an invalid token" do
    get confirm_email_path(token: "garbage")
    assert_redirected_to root_path
    assert_not users(:member).reload.confirmed?
  end

  test "resend enqueues a confirmation email for unconfirmed members" do
    sign_in_as(users(:member))
    assert_enqueued_emails 1 do
      post resend_confirmation_path
    end
  end

  test "resend does nothing for already-confirmed members" do
    users(:member).update!(confirmed_at: Time.current)
    sign_in_as(users(:member))
    assert_no_enqueued_emails do
      post resend_confirmation_path
    end
  end
end
