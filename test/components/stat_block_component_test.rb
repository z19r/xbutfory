require 'test_helper'

class StatBlockComponentTest < ViewComponent::TestCase
  test 'renders index totals and new-today count' do
    render_inline(
      StatBlockComponent.new(
        new_today: 3,
        total_entries: 42,
        categories_count: 7,
      ),
    )
    assert_selector '.c-stats__number', text: '42'
    assert_text '3 new today'
    assert_text '7 categories'
  end

  test 'defaults to zero counts' do
    render_inline(StatBlockComponent.new)
    assert_selector '.c-stats__number', text: '0'
  end
end
