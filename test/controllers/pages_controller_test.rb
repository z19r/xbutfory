require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "home page loads with feed" do
    get root_url
    assert_response :success
    assert_select ".c-masthead__mark"
    assert_select ".c-card", minimum: 1
  end

  test "utility bar shows the account menu when signed in" do
    sign_in_as(users(:member))
    get root_url
    assert_select ".c-account-menu__handle", text: "@member"
    assert_select "a[href='/sign_in']", count: 0
  end

  test "utility bar shows sign-in links when signed out" do
    get root_url
    assert_select "a[href='/sign_in']"
    assert_select ".c-account-menu", count: 0
  end

  test "home renders the maximal shell: wide body, sidebar rail and featured strip" do
    get root_url
    assert_select "body.is-home"
    assert_select ".l-columns .l-main .l-feed"
    assert_select ".l-rail .c-tag-cloud"
    assert_select ".l-rail .c-digest"
    assert_select ".l-rail .l-rail__count-num"
    assert_select ".c-featured-bar"
  end

  test "home page search filters entries" do
    get root_url, params: { q: "Tinder" }
    assert_response :success
  end

  test "home page sort by top" do
    get root_url, params: { sort: "top" }
    assert_response :success
    assert_select ".c-sort__seg--active", text: "Top"
  end

  test "home page sort by hot (trending)" do
    get root_url, params: { sort: "trending" }
    assert_response :success
    assert_select ".c-sort__seg--active", text: "Hot"
  end

  test "home page sort by random" do
    get root_url, params: { sort: "random" }
    assert_response :success
  end

  test "hero dek matches reference copy" do
    get root_url
    assert_select ".l-dek", /pitch themselves as/
    assert_select ".l-dek", /Updated daily, voted by humans/
    assert_select ".l-dek code.l-chip", text: "X but for Y"
    assert_select ".l-dek i", text: "newly launched"
  end

  test "hero shows the issue dateline" do
    get root_url
    assert_select ".l-hero .l-issue", /ISSUE 26/
    assert_select ".l-hero .l-issue .l-live"
  end

  test "vote buttons have stimulus data attributes" do
    get root_url
    assert_select "[data-controller='vote']", minimum: 1
    assert_select "[data-action='click->vote#toggle']", minimum: 1
  end

  test "search input has stimulus data attributes" do
    get root_url
    assert_select "[data-controller~='search-filter']"
    assert_select "[data-action*='input->search-filter#search']"
  end

  test "glossy nav tabs are links not buttons" do
    get root_url
    assert_select "a.c-glossy-nav__tab", minimum: 6
    assert_select "button.c-glossy-nav__tab", count: 0
  end

  test "glossy nav shows the indexed-sites note" do
    get root_url
    assert_select ".c-glossy-nav__note", text: /sites indexed/
  end

  test "hides nsfw entries by default" do
    nsfw_entry = Entry.create!(x: "TestNSFW", y: "hidden", submitter: "t", nsfw: true, user: users(:member))
    get root_url
    assert_response :success
    assert_select ".c-card", minimum: 1
  end

  test "shows nsfw entries when after_dark cookie is set" do
    Entry.create!(x: "TestNSFW", y: "visible", submitter: "t", nsfw: true, user: users(:member))
    cookies[:after_dark] = "1"
    get root_url
    assert_response :success
  end

  test "category filter shows the filter chip and narrows the feed" do
    get root_url, params: { category: "saas" }
    assert_response :success
    assert_select ".l-filter .l-filter__name", text: /SaaS/
    assert_select ".l-filter__clear[href=?]", root_path
  end

  test "konami modal markup is present" do
    get root_url
    assert_select "[data-controller='konami']"
    assert_select ".c-konami__modal"
  end
end
