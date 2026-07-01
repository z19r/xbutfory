require 'test_helper'

class WeeklyDigestTest < ActiveSupport::TestCase
  include ActionMailer::TestHelper

  def make_entry(created_at:, **attrs)
    Entry.create!({ user: users(:member), x: 'Uber', y: 'llamas', tier: 'free', created_at: created_at }.merge(attrs))
  end

  test 'entries_since returns only recent live sfw listings' do
    recent = make_entry(created_at: 2.days.ago)
    stale = make_entry(created_at: 2.weeks.ago, x: 'Old')
    draft = make_entry(created_at: 1.day.ago, x: 'Draft', status: 'pending')
    spicy = make_entry(created_at: 1.day.ago, x: 'Spicy', nsfw: true)

    entries = WeeklyDigest.new.entries_since(1.week.ago)
    assert_includes entries, recent
    assert_not_includes entries, stale
    assert_not_includes entries, draft
    assert_not_includes entries, spicy
  end

  test 'deliver_all emails standalone subscribers and confirmed opted-in members' do
    make_entry(created_at: 1.day.ago)
    DigestSubscription.create!(email: 'reader@example.com')
    users(:member).update!(confirmed_at: Time.current, digest_opt_in: true)

    assert_enqueued_emails 2 do
      assert_equal 2, WeeklyDigest.deliver_all
    end
  end

  test 'deliver_all sends nothing when there is no fresh content' do
    Vote.delete_all
    Entry.delete_all
    DigestSubscription.create!(email: 'reader@example.com')
    assert_no_enqueued_emails do
      assert_equal 0, WeeklyDigest.deliver_all
    end
  end

  test 'a confirmed member who opted out is skipped' do
    make_entry(created_at: 1.day.ago)
    users(:member).update!(confirmed_at: Time.current, digest_opt_in: false)

    assert_no_enqueued_emails do
      WeeklyDigest.deliver_all
    end
  end
end
