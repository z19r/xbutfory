require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "home page loads with feed" do
    get root_url
    assert_response :success
    assert_select ".c-masthead__mark"
    assert_select ".c-card", minimum: 1
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

  test "home page sort by random" do
    get root_url, params: { sort: "random" }
    assert_response :success
  end

  test "vote buttons have stimulus data attributes" do
    get root_url
    assert_select "[data-controller='vote']", minimum: 1
    assert_select "[data-action='click->vote#toggle']", minimum: 1
  end

  test "search input has stimulus data attributes" do
    get root_url
    assert_select "[data-controller='search-filter']"
    assert_select "[data-action='input->search-filter#search']"
  end

  test "nav tabs are links not buttons" do
    get root_url
    assert_select "a.c-nav-tabs__tab", minimum: 6
    assert_select "button.c-nav-tabs__tab", count: 0
  end
end
