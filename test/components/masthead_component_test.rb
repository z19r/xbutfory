require "test_helper"

class MastheadComponentTest < ViewComponent::TestCase
  test "renders the maximal wordmark lockup (ghost + beta)" do
    render_inline(MastheadComponent.new)
    assert_selector ".c-masthead__mark .c-wordmark", text: /Xbutfor/
    assert_selector ".c-wordmark__ghost", text: "XbutforY."
    assert_selector ".c-beta-burst__label", text: "BETA"
  end

  test "Y has logo-y stimulus controller" do
    render_inline(MastheadComponent.new)
    assert_selector "[data-controller='logo-y']"
    assert_selector "[data-logo-y-target='letter']"
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
