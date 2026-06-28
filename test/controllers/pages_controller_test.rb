require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "home page loads with feed" do
    get root_url
    assert_response :success
    assert_select ".c-masthead__mark"
    assert_select ".c-card", minimum: 1
  end
end
