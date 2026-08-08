require 'test_helper'

class MilestoneNotifierTest < ActiveSupport::TestCase
  def entry_at(votes_count)
    Entry.create!(
      user: users(:member),
      x: 'Uber',
      y: 'llamas',
      tier: 'free',
      votes_count: votes_count,
    )
  end

  test 'a milestone enqueues exactly one email' do
    entry = entry_at(10)
    assert_difference -> { MilestoneEmailJob.jobs.size }, 1 do
      MilestoneNotifier.check(entry)
    end
  end

  test 'a milestone can only be claimed once (no double-send race)' do
    entry = entry_at(10)
    MilestoneNotifier.check(entry)

    assert_no_difference -> { MilestoneEmailJob.jobs.size } do
      MilestoneNotifier.check(entry) # concurrent duplicate check
    end
  end

  test 'a later milestone can still be claimed' do
    entry = entry_at(10)
    MilestoneNotifier.check(entry)
    # votes_count is a counter cache (attr_readonly); update_column bypasses
    # that to arrange the later milestone.
    entry.update_column(:votes_count, 25)

    assert_difference -> { MilestoneEmailJob.jobs.size }, 1 do
      MilestoneNotifier.check(entry)
    end
  end

  test 'non-threshold counts stay quiet' do
    assert_no_difference -> { MilestoneEmailJob.jobs.size } do
      MilestoneNotifier.check(entry_at(11))
    end
  end
end
