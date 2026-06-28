require "test_helper"

# The home feed must always place paid listings the way the design dictates:
# one PINNED sponsor pinned to the very top, one SPOTLIGHT dropped mid-feed,
# and organic numbering that ignores the pinned slot (first organic is #001).
class PagesFeedPlacementTest < ActionDispatch::IntegrationTest
  test "pinned sponsor is the first card in the feed" do
    get root_url
    assert_select ".l-feed .c-card:first-child.c-card--pinned"
    assert_select ".c-card--pinned .c-card__ribbon", /PINNED SPONSOR/
  end

  test "spotlight sponsor is dropped mid-feed, never first" do
    get root_url
    assert_select ".l-feed .c-card:first-child.c-card--spotlight", false
    # pinned (1), two organic (2,3), spotlight (4)
    assert_select ".l-feed .c-card:nth-child(4).c-card--spotlight"
  end

  test "organic numbering skips the pinned slot" do
    get root_url
    # The pinned card carries no index number.
    assert_select ".c-card--pinned .c-card__idx", false
    # The first organic card is #001, proving pinned did not consume a number.
    assert_select ".c-card__idx", text: "#001"
  end

  test "a search that excludes the sponsor drops it from the feed" do
    get root_url, params: { q: "Notion" }
    assert_response :success
    assert_select ".c-card--pinned", false
  end

  test "the home hero arms the idle-toast easter egg" do
    get root_url
    assert_select ".l-hero[data-controller~='idle-toast']"
  end
end
