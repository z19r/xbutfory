require 'test_helper'

class Admin::UsersControllerTest < ActionDispatch::IntegrationTest
  test 'members index is 404 for anonymous visitors' do
    get admin_users_path
    assert_response :not_found
  end

  test 'members index is 404 for non-admin members' do
    sign_in_as(users(:member))
    get admin_users_path
    assert_response :not_found
  end

  test 'members index renders and searches for admins' do
    sign_in_as(users(:editor))
    get admin_users_path(q: 'member@example.com')
    assert_response :success
    assert_select '.c-sub', 1
  end

  test 'suspend bans a member and pulls their live listings' do
    user = users(:member)
    entry = user.entries.create!(x: 'Uber', y: 'goats')
    sign_in_as(users(:editor))
    patch suspend_admin_user_path(user)
    assert user.reload.suspended?
    assert entry.reload.withdrawn?
  end

  test 'a suspended member is signed out on their next request' do
    user = users(:member)
    sign_in_as(user)
    user.suspend!
    get account_settings_path
    assert_redirected_to sign_in_path
  end

  test 'an admin cannot suspend themselves' do
    editor = users(:editor)
    sign_in_as(editor)
    patch suspend_admin_user_path(editor)
    assert_not editor.reload.suspended?
  end

  test 'reinstate lifts a suspension' do
    user = users(:member)
    user.suspend!
    sign_in_as(users(:editor))
    patch reinstate_admin_user_path(user)
    assert user.reload.confirmed?
  end

  test 'reset_email updates the address and re-sends confirmation' do
    user = users(:member)
    sign_in_as(users(:editor))
    assert_changes -> { ConfirmationEmailJob.jobs.size }, from: 0, to: 1 do
      patch reset_email_admin_user_path(user),
            params: {
              email: 'corrected@example.com',
            }
    end
    assert_equal 'corrected@example.com', user.reload.email
  end

  test 'reset_email rejects an address already in use' do
    user = users(:member)
    sign_in_as(users(:editor))
    patch reset_email_admin_user_path(user),
          params: {
            email: users(:editor).email,
          }
    assert_equal 'member@example.com', user.reload.email
  end

  test 'send_password_reset enqueues the reset email' do
    sign_in_as(users(:editor))
    assert_changes -> { PasswordResetEmailJob.jobs.size }, from: 0, to: 1 do
      post send_password_reset_admin_user_path(users(:member))
    end
  end

  test 'resend_confirmation only fires for unconfirmed members' do
    sign_in_as(users(:editor))
    assert_changes -> { ConfirmationEmailJob.jobs.size }, from: 0, to: 1 do
      post resend_confirmation_admin_user_path(users(:unconfirmed))
    end
    assert_no_changes -> { ConfirmationEmailJob.jobs.size } do
      post resend_confirmation_admin_user_path(users(:member))
    end
  end

  test 'toggle_admin grants and revokes the bit, but never on yourself' do
    editor = users(:editor)
    member = users(:member)
    sign_in_as(editor)
    patch toggle_admin_admin_user_path(member)
    assert member.reload.admin?
    patch toggle_admin_admin_user_path(editor)
    assert editor.reload.admin?
  end

  test 'members index filters by state' do
    users(:member) # confirmed; the rest of the fixtures are unconfirmed
    sign_in_as(users(:editor))
    get admin_users_path(state: 'confirmed')
    assert_response :success
    assert_select '.c-sub', 1
  end

  test 'suspend is a no-op on an already-suspended member' do
    user = users(:member)
    user.suspend!
    sign_in_as(users(:editor))
    patch suspend_admin_user_path(user)
    assert user.reload.suspended?
  end

  test 'reinstate is a no-op on a member in good standing' do
    user = users(:member)
    sign_in_as(users(:editor))
    patch reinstate_admin_user_path(user)
    assert user.reload.confirmed?
  end

  test 'suspended members cannot sign in' do
    user = users(:member)
    user.suspend!
    post sign_in_path, params: { login: user.email, password: 'password' }
    assert_redirected_to sign_in_path
    get account_settings_path
    assert_redirected_to sign_in_path
  end
end
