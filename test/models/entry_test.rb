require "test_helper"

class EntryTest < ActiveSupport::TestCase
  test "generates slug from x and y on create" do
    entry = Entry.create!(x: "Slack", y: "pets", submitter: "tester")
    assert_equal "slack-but-for-pets", entry.slug
  end

  test "does not overwrite an explicit slug" do
    entry = Entry.create!(x: "Slack", y: "pets", submitter: "tester", slug: "custom-slug")
    assert_equal "custom-slug", entry.slug
  end

  test "requires x, y, and submitter" do
    entry = Entry.new
    assert_not entry.valid?
    assert_includes entry.errors[:x], "can't be blank"
    assert_includes entry.errors[:y], "can't be blank"
    assert_includes entry.errors[:submitter], "can't be blank"
  end

  test "enforces unique slugs" do
    Entry.create!(x: "Slack", y: "pets", submitter: "a")
    duplicate = Entry.new(x: "Slack", y: "pets", submitter: "b")
    assert_not duplicate.valid?
    assert_includes duplicate.errors[:slug], "has already been taken"
  end

  test "title returns formatted string" do
    entry = Entry.new(x: "Tinder", y: "dogs")
    assert_equal "Tinder but for dogs", entry.title
  end

  test "latest scope orders by created_at desc" do
    old = entries(:two)
    new_entry = entries(:one)
    results = Entry.latest
    assert results.index(new_entry) < results.index(old)
  end

  test "trending scope orders by votes_count desc" do
    results = Entry.trending
    assert results.first.votes_count >= results.last.votes_count
  end

  test "by_category scope filters entries" do
    consumer_entries = Entry.by_category("consumer")
    consumer_entries.each do |e|
      assert_equal "consumer", e.category
    end
  end

  test "votes_count defaults to zero" do
    entry = Entry.create!(x: "New", y: "thing", submitter: "tester")
    assert_equal 0, entry.votes_count
  end

  test "search scope matches on x" do
    Entry.create!(x: "UniqueProduct", y: "trees", submitter: "t")
    results = Entry.search("UniqueProduct")
    assert results.any? { |e| e.x == "UniqueProduct" }
  end

  test "search scope matches on y" do
    Entry.create!(x: "Something", y: "UniqueNiche", submitter: "t")
    results = Entry.search("UniqueNiche")
    assert results.any? { |e| e.y == "UniqueNiche" }
  end

  test "search scope is case-insensitive" do
    Entry.create!(x: "CaseTest", y: "example", submitter: "t")
    results = Entry.search("casetest")
    assert results.any? { |e| e.x == "CaseTest" }
  end
end
