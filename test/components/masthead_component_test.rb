require "test_helper"

class MastheadComponentTest < ViewComponent::TestCase
  test "renders wordmark with accent Y" do
    render_inline(MastheadComponent.new)
    assert_selector ".c-masthead__wordmark", text: /Xbutfor/
    assert_selector ".c-masthead__wordmark-y", text: "Y."
  end

  test "renders eyebrow" do
    render_inline(MastheadComponent.new)
    assert_selector ".c-masthead__eyebrow", text: "The Directory Of"
  end

  test "renders dek" do
    render_inline(MastheadComponent.new(dek: "Test dek"))
    assert_selector ".c-masthead__dek", text: "Test dek"
  end

  test "renders search slot" do
    render_inline(MastheadComponent.new) do |masthead|
      masthead.with_search_slot { "<input type='search'>".html_safe }
    end
    assert_selector "input[type='search']"
  end
end
