require "test_helper"

class VoteTest < ActiveSupport::TestCase
  test "belongs to entry" do
    vote = votes(:one)
    assert_instance_of Entry, vote.entry
  end

  test "requires voter_ip" do
    vote = Vote.new(entry: entries(:one))
    assert_not vote.valid?
    assert_includes vote.errors[:voter_ip], "can't be blank"
  end

  test "enforces one vote per ip per entry" do
    existing = votes(:one)
    duplicate = Vote.new(entry: existing.entry, voter_ip: existing.voter_ip)
    assert_not duplicate.valid?
    assert_includes duplicate.errors[:voter_ip], "has already been taken"
  end

  test "allows same ip on different entries" do
    vote = Vote.new(entry: entries(:two), voter_ip: votes(:one).voter_ip)
    assert vote.valid?
  end

  test "updates entry counter cache on create" do
    entry = entries(:one)
    initial_count = entry.votes_count
    entry.votes.create!(voter_ip: "10.0.0.99")
    assert_equal initial_count + 1, entry.reload.votes_count
  end

  test "updates entry counter cache on destroy" do
    entry = entries(:one)
    vote = entry.votes.create!(voter_ip: "10.0.0.99")
    count_after_create = entry.reload.votes_count
    vote.destroy
    assert_equal count_after_create - 1, entry.reload.votes_count
  end
end
