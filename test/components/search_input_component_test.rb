require "test_helper"

class SearchInputComponentTest < ViewComponent::TestCase
  test "renders a search field wired to the search-filter controller" do
    render_inline(SearchInputComponent.new)
    assert_selector ".c-search-input[data-controller~='search-filter']"
    assert_selector "input.c-search-input__field[data-search-filter-target='input']"
  end

  test "the field is also wired to the placeholder-rotator controller" do
    render_inline(SearchInputComponent.new)
    assert_selector ".c-search-input[data-controller~='placeholder-rotator']"
    assert_selector "input[data-placeholder-rotator-target='input']"
  end

  test "supplies the rotation phrases as a JSON value with at least two options" do
    render_inline(SearchInputComponent.new)
    input = page.find("input.c-search-input__field")
    phrases = JSON.parse(input["data-placeholder-rotator-phrases-value"])
    assert_operator phrases.size, :>=, 2
    assert_equal SearchInputComponent::PHRASES.first, input["placeholder"]
    assert_includes phrases, SearchInputComponent::PHRASES.first
  end

  test "preserves the current query as the field value" do
    render_inline(SearchInputComponent.new(value: "Notion"))
    assert_selector "input.c-search-input__field[value='Notion']"
  end
end
