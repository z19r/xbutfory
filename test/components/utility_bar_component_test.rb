require "test_helper"

class UtilityBarComponentTest < ViewComponent::TestCase
  test "renders issue line with live dot" do
    render_inline(UtilityBarComponent.new)
    assert_selector ".c-utility-bar__live-dot"
    assert_selector ".c-utility-bar__issue"
  end

  test "renders After Dark toggle" do
    render_inline(UtilityBarComponent.new)
    assert_selector ".c-utility-bar__after-dark", text: /After Dark/
    assert_selector "[data-controller='after-dark']"
    assert_selector "[data-action='click->after-dark#toggle']"
  end

  test "renders sign in and create account links" do
    render_inline(UtilityBarComponent.new)
    assert_selector "a[href='/sign_in']", text: "Sign in"
    assert_selector "a[href='/sign_up']", text: "Create account"
  end
end
