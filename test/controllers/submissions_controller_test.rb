require "test_helper"

class SubmissionsControllerTest < ActionDispatch::IntegrationTest
  test "submit form loads with tier selector and inline preview" do
    sign_in_as(users(:member))
    get new_submission_path
    assert_response :success
    assert_select ".c-submit__title", text: "Submit a Site"
    assert_select ".c-submit-preview"
    assert_select "[data-controller='submit-preview tier']"
    assert_select "input[type=radio][name='entry[tier]'][value=free]"
    assert_select "input[type=radio][name='entry[tier]'][value=featured]"
  end

  test "creating a valid entry redirects to detail and is owned by the member" do
    sign_in_as(users(:member))
    assert_difference "Entry.count", 1 do
      post submissions_path, params: {
        entry: { x: "TestApp", y: "unit tests", name: "Tester", description: "A test entry.",
                 category: "saas", tier: "free" }
      }
    end
    entry = Entry.find_by(x: "TestApp")
    assert_redirected_to entry_path(slug: "testapp-but-for-unit-tests")
    assert_equal users(:member), entry.user
    assert_equal "member", entry.submitter, "byline is the signed-in @handle"
  end

  test "submit is gated behind a session" do
    get new_submission_path
    assert_redirected_to sign_in_path
  end

  test "featured tier returns a payment-coming-soon notice" do
    sign_in_as(users(:member))
    post submissions_path, params: { entry: { x: "Fancy", y: "yachts", tier: "featured" } }
    follow_redirect!
    assert_match(/payment/i, flash[:notice].to_s)
  end
end
