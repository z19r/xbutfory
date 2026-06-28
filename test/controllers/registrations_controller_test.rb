require "test_helper"

class RegistrationsControllerTest < ActionDispatch::IntegrationTest
  test "sign up redirects to root with notice" do
    get sign_up_url
    assert_redirected_to root_url
    follow_redirect!
    assert_response :success
  end
end
