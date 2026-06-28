require "test_helper"

class SubmissionsControllerTest < ActionDispatch::IntegrationTest
  test "submit form loads" do
    get new_submission_path
    assert_response :success
    assert_select ".l-submit__title"
  end

  test "creating a valid entry redirects to detail" do
    assert_difference "Entry.count", 1 do
      post submissions_path, params: {
        entry: {
          x: "TestApp",
          y: "unit tests",
          description: "A test entry.",
          submitter: "tester",
          category: "saas"
        }
      }
    end
    assert_redirected_to entry_path(slug: "testapp-but-for-unit-tests")
  end
end
