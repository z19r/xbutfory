require "test_helper"

class GlossyNavComponentTest < ViewComponent::TestCase
  test "renders the six primary tabs as links" do
    render_inline(GlossyNavComponent.new)
    assert_selector "a.c-glossy-nav__tab", count: 6
    assert_selector "a.c-glossy-nav__tab", text: "Latest"
    assert_selector "a.c-glossy-nav__tab", text: "Submit"
  end

  test "marks the active tab" do
    render_inline(GlossyNavComponent.new(active: "top"))
    assert_selector "a.c-glossy-nav__tab--active[aria-current='page']", text: "Top Voted"
    assert_selector "a.c-glossy-nav__tab--active", count: 1
  end

  test "renders the right-aligned note when given" do
    render_inline(GlossyNavComponent.new(note: "1,024 sites indexed"))
    assert_selector ".c-glossy-nav__note", text: "1,024 sites indexed"
  end

  test "omits the note when blank" do
    render_inline(GlossyNavComponent.new)
    assert_no_selector ".c-glossy-nav__note"
  end
end
