require "test_helper"

class MastheadComponentTest < ViewComponent::TestCase
  test "renders wordmark" do
    render_inline(MastheadComponent.new)
    assert_selector ".c-masthead__mark", text: /Xbutfor/
    assert_selector ".c-masthead__mark-y", text: "but"
  end

  test "renders eyebrow" do
    render_inline(MastheadComponent.new)
    assert_selector ".c-masthead__eyebrow", text: "THE DIRECTORY OF"
  end

  test "renders search slot" do
    render_inline(MastheadComponent.new) do |masthead|
      masthead.with_search_slot { "<input type='search'>".html_safe }
    end
    assert_selector "input[type='search']"
  end
end
