require 'test_helper'

class NavTabsComponentTest < ViewComponent::TestCase
  test 'renders all default tabs' do
    render_inline(NavTabsComponent.new)
    assert_selector '.c-nav-tabs__tab', count: 6
    assert_selector '.c-nav-tabs__tab', text: 'Latest'
    assert_selector '.c-nav-tabs__tab', text: 'Categories'
  end

  test 'marks active tab' do
    render_inline(NavTabsComponent.new(active: 'trending'))
    assert_selector '.c-nav-tabs__tab--active', text: 'Trending'
    assert_no_selector '.c-nav-tabs__tab--active', text: 'Latest'
  end
end
