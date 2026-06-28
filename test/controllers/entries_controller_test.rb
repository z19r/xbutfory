require "test_helper"

class EntriesControllerTest < ActionDispatch::IntegrationTest
  test "show renders entry detail with formula card and vote wiring" do
    entry = entries(:one)
    get entry_path(slug: entry.slug)
    assert_response :success
    assert_select ".c-detail__title", text: /#{entry.x}/
    assert_select ".c-detail__conn", text: /but for/
    assert_select ".c-detail__meta-card"
    assert_select ".c-detail__mcv", text: "#{entry.x} × #{entry.y}"
    assert_select "[data-controller='vote']"
    assert_select "[data-action='click->vote#toggle']"
    assert_select ".c-detail__status", text: /Live & launched/
  end

  test "show redirects to root for unknown slug" do
    get entry_path(slug: "nope-not-real")
    assert_redirected_to root_path
  end
end
