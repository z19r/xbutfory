require "test_helper"

class WordmarkComponentTest < ViewComponent::TestCase
  test "renders the lockup with the accent pivot" do
    render_inline(WordmarkComponent.new)
    assert_selector ".c-wordmark", text: /Xbutfor/
    assert_selector ".c-wordmark__accent", text: "but"
    assert_selector ".c-wordmark__dot", text: "."
  end

  test "accent_y false leaves the trailing Y in ink" do
    render_inline(WordmarkComponent.new(accent_y: false))
    # The "but" pivot is always accent; with accent_y off the Y is not.
    assert_selector ".c-wordmark__accent", text: "but", count: 1
  end

  test "ghost renders the offset double-exposure" do
    render_inline(WordmarkComponent.new(ghost: true))
    assert_selector ".c-wordmark__ghost", text: "XbutforY."
  end

  test "beta pins a corner starburst" do
    render_inline(WordmarkComponent.new(beta: true, beta_label: "NEW"))
    assert_selector ".c-wordmark__burst .c-beta-burst__label", text: "NEW"
  end

  test "interactive carries the logo-y easter egg" do
    render_inline(WordmarkComponent.new(interactive: true))
    assert_selector ".c-wordmark[data-controller='logo-y']"
    assert_selector "[data-logo-y-target='letter']", text: "Y"
  end

  test "non-interactive omits the controller" do
    render_inline(WordmarkComponent.new)
    assert_no_selector "[data-controller='logo-y']"
  end

  test "fixed size sets the wordmark size variable" do
    render_inline(WordmarkComponent.new(size: 26))
    assert_selector ".c-wordmark[style*='--wm-size: 26px']"
  end
end
