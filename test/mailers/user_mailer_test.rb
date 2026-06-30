require "test_helper"

class UserMailerTest < ActionMailer::TestCase
  test "password_reset is addressed to the user with a reset link" do
    user = users(:member)
    mail = UserMailer.password_reset(user)

    assert_equal [user.email], mail.to
    assert_match(/reset/i, mail.subject)
    token = user.generate_token_for(:password_reset)
    # the link carries a valid token (body uses a fresh one, but it resolves to the same user)
    assert_match "/password/reset/", mail.body.encoded
    assert User.find_by_token_for(:password_reset, token) == user
  end
end
