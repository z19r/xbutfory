require 'test_helper'

class WeeklyDigestJobTest < ActiveSupport::TestCase
  test 'fans the digest out to every recipient' do
    Entry.create!(
      user: users(:member),
      x: 'Uber',
      y: 'llamas',
      tier: 'free',
      created_at: 1.day.ago,
    )
    DigestSubscription.create!(email: 'reader@example.com')
    # Fixture members may be opted in; pin the recipient list to the one sub.
    User.update_all(digest_opt_in: false)

    assert_difference -> { DigestEmailJob.jobs.size }, 1 do
      WeeklyDigestJob.new.perform
    end
  end
end
