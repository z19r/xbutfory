require "test_helper"

class BetaBurstComponentTest < ViewComponent::TestCase
  test "renders the label and the three starburst layers" do
    render_inline(BetaBurstComponent.new(label: "BETA"))
    assert_selector ".c-beta-burst__fill"
    assert_selector ".c-beta-burst__sheen"
    assert_selector ".c-beta-burst__label", text: "BETA"
  end

  test "is decorative (aria-hidden)" do
    render_inline(BetaBurstComponent.new)
    assert_selector ".c-beta-burst[aria-hidden='true']"
  end

  test "sizes the wrapper and counter-rotates the label" do
    render_inline(BetaBurstComponent.new(size: 100, rotate: 12))
    assert_selector ".c-beta-burst[style*='width: 100px']"
    # label counter-rotates to stay upright: -(rotate) - 7 = -19deg
    assert_selector ".c-beta-burst__label[style*='rotate(-19deg)']"
  end
end
