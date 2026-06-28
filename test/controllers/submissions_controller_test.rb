require "test_helper"

class SubmissionsControllerTest < ActionDispatch::IntegrationTest
  test "submit form loads with tier selector and inline preview" do
    get new_submission_path
    assert_response :success
    assert_select ".c-submit__title", text: "Submit a Site"
    assert_select ".c-submit-preview"
    assert_select "[data-controller='submit-preview tier']"
    assert_select "input[type=radio][name='entry[tier]'][value=free]"
    assert_select "input[type=radio][name='entry[tier]'][value=featured]"
  end

  test "creating a valid entry redirects to detail" do
    assert_difference "Entry.count", 1 do
      post submissions_path, params: {
        entry: { x: "TestApp", y: "unit tests", name: "Tester", description: "A test entry.",
                 submitter: "tester", category: "saas", tier: "free" }
      }
    end
    assert_redirected_to entry_path(slug: "testapp-but-for-unit-tests")
  end

  test "submitting without a handle defaults to anonymous" do
    post submissions_path, params: { entry: { x: "NoHandle", y: "ghosts" } }
    assert_equal "anonymous", Entry.find_by(x: "NoHandle").submitter
  end

  test "featured tier returns a payment-coming-soon notice" do
    post submissions_path, params: { entry: { x: "Fancy", y: "yachts", tier: "featured" } }
    follow_redirect!
    assert_match(/payment/i, flash[:notice].to_s)
  end
end
