require "test_helper"

class FeedsControllerTest < ActionDispatch::IntegrationTest
  test "feed.xml resolves and is an atom feed" do
    get "/feed.xml"
    assert_response :success
    assert_match "atom+xml", @response.media_type
    assert_select "feed > title", /XbutforY/
  end

  test "the feed lists the latest entries with their X but for Y titles" do
    get "/feed.xml"
    assert_select "entry > title", text: "Notion but for recipes"
    assert_select "entry", minimum: 2
  end

  test "the feed omits NSFW entries" do
    Entry.create!(x: "Secret", y: "after dark", slug: "secret-but-for-after-dark",
                  description: "hidden", nsfw: true, user: users(:member))
    get "/feed.xml"
    assert_select "entry > title", text: "Secret but for after dark", count: 0
  end

  test "feed_path is the advertised /feed.xml url" do
    assert_equal "/feed.xml", feed_path
  end
end
