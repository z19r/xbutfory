require "test_helper"

class VoteTest < ActiveSupport::TestCase
  include ActionMailer::TestHelper

  test "belongs to entry and user" do
    vote = votes(:one)
    assert_instance_of Entry, vote.entry
    assert_instance_of User, vote.user
  end

  test "requires a user" do
    vote = Vote.new(entry: entries(:one))
    assert_not vote.valid?
    assert_includes vote.errors[:user], "must exist"
  end

  test "enforces one vote per user per entry" do
    existing = votes(:one)
    duplicate = Vote.new(entry: existing.entry, user: existing.user)
    assert_not duplicate.valid?
    assert_includes duplicate.errors[:user_id], "has already been taken"
  end

  test "allows the same user to vote on different entries" do
    vote = Vote.new(entry: entries(:three), user: votes(:one).user)
    assert vote.valid?
  end

  test "updates entry counter cache on create" do
    entry = entries(:one)
    initial_count = entry.votes_count
    entry.votes.create!(user: users(:apt_4b))
    assert_equal initial_count + 1, entry.reload.votes_count
  end

  test "updates entry counter cache on destroy" do
    entry = entries(:one)
    vote = entry.votes.create!(user: users(:apt_4b))
    count_after_create = entry.reload.votes_count
    vote.destroy
    assert_equal count_after_create - 1, entry.reload.votes_count
  end

  # --- Milestone notifications ---

  def milestone_owner(**attrs)
    User.create!(
      { handle: "owner1", email: "owner1@example.com", display_name: "Owner",
        password: "password", milestone_notifications: true }.merge(attrs),
    )
  end

  def entry_owned_by(owner, votes_count:)
    Entry.create!(user: owner, x: "Uber", y: "llamas", tier: "free", votes_count: votes_count)
  end

  test "a vote that lands the tally on a milestone emails the owner" do
    entry = entry_owned_by(milestone_owner, votes_count: 9)
    assert_enqueued_emails 1 do
      Vote.create!(user: users(:member), entry: entry)
    end
    assert_equal 10, entry.reload.votes_count
  end

  test "a vote that does not hit a milestone stays quiet" do
    entry = entry_owned_by(milestone_owner, votes_count: 5)
    assert_no_enqueued_emails do
      Vote.create!(user: users(:member), entry: entry)
    end
  end

  test "owners who opted out of milestone notifications are not emailed" do
    entry = entry_owned_by(milestone_owner(milestone_notifications: false), votes_count: 9)
    assert_no_enqueued_emails do
      Vote.create!(user: users(:member), entry: entry)
    end
  end

  test "the legacy placeholder owner is never emailed" do
    entry = entry_owned_by(users(:legacy), votes_count: 9)
    assert_no_enqueued_emails do
      Vote.create!(user: users(:member), entry: entry)
    end
  end
end
