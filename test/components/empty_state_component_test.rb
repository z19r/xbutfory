require "test_helper"

class EmptyStateComponentTest < ViewComponent::TestCase
  test "renders formula placeholder" do
    render_inline(EmptyStateComponent.new)
    assert_selector ".c-empty-state__formula", text: /X.*but for.*Y/
  end

  test "renders custom title" do
    render_inline(EmptyStateComponent.new(title: "Nothing found."))
    assert_selector ".c-empty-state__title", text: "Nothing found."
  end

  test "renders action button when provided" do
    render_inline(
      EmptyStateComponent.new(action: "Submit", action_url: "/submit"),
    )
    assert_selector "a.c-btn[href='/submit']", text: "Submit"
  end

  test "omits action button when not provided" do
    render_inline(EmptyStateComponent.new)
    assert_no_selector ".c-btn"
  end
end
