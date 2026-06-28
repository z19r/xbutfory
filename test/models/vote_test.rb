require "test_helper"

class VoteTest < ActiveSupport::TestCase
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
end
