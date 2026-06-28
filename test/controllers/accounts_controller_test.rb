require "test_helper"

class AccountsControllerTest < ActionDispatch::IntegrationTest
  test "settings requires a session" do
    get account_settings_path
    assert_redirected_to sign_in_path
  end

  test "settings renders the section cards for the member" do
    sign_in_as(users(:member))
    get account_settings_path
    assert_response :success
    assert_select "#profile.c-setcard"
    assert_select "#security.c-setcard"
    assert_select "#notifications.c-setcard"
    assert_select "#connected.c-setcard"
    assert_select "#danger.c-setcard"
    assert_select ".l-settings__handle", text: "@member"
  end

  test "updating the profile saves display name and bio" do
    sign_in_as(users(:member))
    patch account_profile_path, params: { display_name: "Renamed", bio: "Builder of things." }
    assert_redirected_to account_settings_path
    users(:member).reload.tap do |u|
      assert_equal "Renamed", u.display_name
      assert_equal "Builder of things.", u.bio
    end
  end

  test "changing the password requires the current password" do
    sign_in_as(users(:member))
    patch account_security_path, params: { current_password: "wrong", password: "newsecret", password_confirmation: "newsecret" }
    assert_response :unprocessable_entity
    assert users(:member).reload.authenticate("password"), "password unchanged"
  end

  test "changing the password works with the current password" do
    sign_in_as(users(:member))
    patch account_security_path, params: { current_password: "password", password: "newsecret", password_confirmation: "newsecret" }
    assert_redirected_to account_settings_path
    assert users(:member).reload.authenticate("newsecret")
  end

  test "updating notifications toggles preferences" do
    sign_in_as(users(:member))
    patch account_notifications_path, params: { digest_opt_in: "1" } # others omitted -> false
    member = users(:member).reload
    assert member.digest_opt_in
    assert_not member.reply_notifications
    assert_not member.milestone_notifications
  end

  test "regenerating the api key changes it" do
    sign_in_as(users(:member))
    old_key = users(:member).api_key
    post account_api_key_path
    assert_redirected_to account_settings_path
    assert_not_equal old_key, users(:member).reload.api_key
  end

  test "deleting the account withdraws listings to legacy and ends the session" do
    member = users(:member)
    owned = member.entries.create!(x: "Doomed", y: "deletion")
    sign_in_as(member)

    assert_difference "User.count", -1 do
      delete account_path
    end
    assert_redirected_to root_path

    owned.reload
    assert_equal users(:legacy), owned.user
    assert owned.withdrawn?

    # session is gone
    get account_settings_path
    assert_redirected_to sign_in_path
  end
end
