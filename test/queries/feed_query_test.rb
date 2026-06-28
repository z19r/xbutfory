require "test_helper"

class FeedQueryTest < ActiveSupport::TestCase
  def slugs(entries) = entries.map(&:slug)

  test "pins the pinned sponsor to the top of the feed" do
    feed = FeedQuery.new(scope: Entry.all).entries
    assert_equal "pinned", feed.first.sponsored
  end

  test "drops the spotlight sponsor after two organic rows" do
    feed = FeedQuery.new(scope: Entry.all).entries
    # pinned (0), organic (1, 2), spotlight (3)
    assert_equal "spotlight", feed[3].sponsored
    refute_equal "spotlight", feed[1].sponsored
  end

  test "a search that excludes the sponsors drops them" do
    feed = FeedQuery.new(scope: Entry.all, query: "Notion").entries
    assert_empty feed.select(&:sponsored)
    assert_includes slugs(feed), "notion-but-for-recipes"
  end

  test "top sort orders organic rows by votes" do
    feed = FeedQuery.new(scope: Entry.all, sort: "top").entries
    organic = feed.reject(&:sponsored)
    assert_equal organic.map(&:votes_count), organic.map(&:votes_count).sort.reverse
  end

  test "respects the supplied scope so NSFW can be excluded" do
    sfw = FeedQuery.new(scope: Entry.sfw).entries
    all = FeedQuery.new(scope: Entry.all).entries
    assert_operator all.size, :>=, sfw.size
  end
end
