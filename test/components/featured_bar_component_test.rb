require "test_helper"

class FeaturedBarComponentTest < ViewComponent::TestCase
  test "renders the label, badges and validity note" do
    render_inline(FeaturedBarComponent.new(badges: ["Digg", "MetaFilter"]))
    assert_selector ".c-featured-bar__label", text: "AS FEATURED ON"
    assert_selector ".c-featured-bar__badge", count: 2
    assert_selector ".c-featured-bar__badge", text: "Digg"
    assert_selector ".c-featured-bar__note", text: /valid XHTML/
  end

  test "gel badges by default; flat when gel is false" do
    render_inline(FeaturedBarComponent.new(badges: ["x"]))
    assert_selector ".c-featured-bar__badge--gel"

    render_inline(FeaturedBarComponent.new(badges: ["x"], gel: false))
    assert_no_selector ".c-featured-bar__badge--gel"
  end

  test "note can be hidden" do
    render_inline(FeaturedBarComponent.new(badges: ["x"], note: ""))
    assert_no_selector ".c-featured-bar__note"
  end
end
