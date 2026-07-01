require 'test_helper'

class Admin::SubmissionsControllerTest < ActionDispatch::IntegrationTest
  test 'queue is 404 for anonymous visitors (not discoverable)' do
    get admin_submissions_path
    assert_response :not_found
  end

  test 'queue is 404 for non-admin members' do
    sign_in_as(users(:member))
    get admin_submissions_path
    assert_response :not_found
  end

  test 'queue renders for admins' do
    users(:member).entries.create!(x: 'Pend', y: 'review', status: 'pending')
    sign_in_as(users(:editor))
    get admin_submissions_path
    assert_response :success
    assert_select '.l-manage__title', text: 'Moderation queue'
    assert_select '.c-sub', 1
  end

  test 'approve moves a pending entry live' do
    entry =
      users(:member).entries.create!(x: 'Pend', y: 'review', status: 'pending')
    sign_in_as(users(:editor))
    patch approve_admin_submission_path(entry)
    assert_redirected_to admin_submissions_path
    assert entry.reload.live?
  end

  test 'request changes sets needs_edits with a reviewer note' do
    entry =
      users(:member).entries.create!(x: 'Pend', y: 'review', status: 'pending')
    sign_in_as(users(:editor))
    patch request_changes_admin_submission_path(entry),
          params: {
            reviewer_note: 'Fix the title.',
          }
    assert_redirected_to admin_submissions_path
    entry.reload
    assert entry.needs_edits?
    assert_equal 'Fix the title.', entry.reviewer_note
  end

  test 'non-admins cannot approve' do
    entry =
      users(:member).entries.create!(x: 'Pend', y: 'review', status: 'pending')
    sign_in_as(users(:member))
    patch approve_admin_submission_path(entry)
    assert_response :not_found
    assert entry.reload.pending?
  end
end
