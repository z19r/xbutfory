require "test_helper"

class StampComponentTest < ViewComponent::TestCase
  test "renders new stamp" do
    render_inline(StampComponent.new(variant: "new"))
    assert_selector ".c-stamp--new", text: "NEW"
  end

  test "renders sponsored stamp" do
    render_inline(StampComponent.new(variant: "sponsored"))
    assert_selector ".c-stamp--sponsored", text: "SPONSORED"
  end

  test "renders custom label" do
    render_inline(StampComponent.new(variant: "featured", label: "PICK"))
    assert_selector ".c-stamp--featured", text: "PICK"
  end
end
