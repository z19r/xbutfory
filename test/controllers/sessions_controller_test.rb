require "test_helper"

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test "sign in redirects to root with notice" do
    get sign_in_url
    assert_redirected_to root_url
    follow_redirect!
    assert_response :success
  end
end
