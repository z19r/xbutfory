require 'test_helper'

class MilestoneMailerTest < ActionMailer::TestCase
  test 'reached is addressed to the owner and names the milestone' do
    user = users(:member)
    entry = entries(:one)
    mail = MilestoneMailer.reached(user: user, entry: entry, milestone: 100)

    assert_equal [user.email], mail.to
    assert_match '100', mail.subject
    assert_match entry.title, mail.subject
    assert_match '100 votes', mail.body.encoded
  end
end
