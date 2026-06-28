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

  test "withdrawing a live listing" do
    member = users(:member)
    entry = member.entries.create!(x: "Wd", y: "x", status: "live")
    sign_in_as(member)
    patch submission_status_path(entry, to: "withdrawn")
    assert_redirected_to manage_submissions_path
    assert entry.reload.withdrawn?
  end

  test "restoring a withdrawn listing" do
    member = users(:member)
    entry = member.entries.create!(x: "Wd2", y: "x", status: "withdrawn")
    sign_in_as(member)
    patch submission_status_path(entry, to: "live")
    assert entry.reload.live?
  end

  test "a disallowed transition is rejected and leaves the status untouched" do
    member = users(:member)
    entry = member.entries.create!(x: "Lv", y: "x", status: "live")
    sign_in_as(member)
    patch submission_status_path(entry, to: "live") # live -> live not allowed
    assert_redirected_to manage_submissions_path
    assert entry.reload.live?
  end

  test "editing a needs_edits listing resubmits it as pending" do
    member = users(:member)
    entry = member.entries.create!(x: "Fix", y: "me", status: "needs_edits")
    sign_in_as(member)
    patch submission_path(entry), params: { entry: { description: "Now improved." } }
    assert_redirected_to manage_submissions_path
    entry.reload
    assert_equal "Now improved.", entry.description
    assert entry.pending?
  end

  test "cannot transition another member's listing" do
    other = entries(:one) # owned by apt_4b
    sign_in_as(users(:member))
    patch submission_status_path(other, to: "withdrawn")
    assert_response :not_found
    assert other.reload.live?, "another member's listing is untouched"
  end
end
