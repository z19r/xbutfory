require 'test_helper'

class MilestoneEmailJobTest < ActiveSupport::TestCase
  include ActionMailer::TestHelper

  def make_entry(owner)
    Entry.create!(user: owner, x: 'Uber', y: 'llamas', tier: 'free')
  end

  test 'delivers the milestone email to the owner' do
    entry = make_entry(users(:member))
    assert_emails 1 do
      MilestoneEmailJob.new.perform(entry.id, 10)
    end
  end

  test 'quietly no-ops when the entry is gone' do
    assert_no_emails { MilestoneEmailJob.new.perform(-1, 10) }
  end

  test 're-checks the opt-out between enqueue and delivery' do
    entry = make_entry(users(:member))
    users(:member).update!(milestone_notifications: false)
    assert_no_emails { MilestoneEmailJob.new.perform(entry.id, 10) }
  end

  test 'never emails the legacy placeholder owner' do
    entry = make_entry(users(:legacy))
    assert_no_emails { MilestoneEmailJob.new.perform(entry.id, 10) }
  end
end
