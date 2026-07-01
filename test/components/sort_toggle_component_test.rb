require 'test_helper'

class SortToggleComponentTest < ViewComponent::TestCase
  Option = SortToggleComponent::Option

  test 'marks the active sort segment' do
    options = [
      Option.new(label: 'New', key: 'newest'),
      Option.new(label: 'Top', key: 'top'),
    ]
    render_inline(SortToggleComponent.new(options: options, active: 'top'))
    assert_selector '.c-sort__seg--active', text: 'Top'
    assert_no_selector '.c-sort__seg--active', text: 'New'
  end

  test 'defaults active to the first option' do
    options = [Option.new(label: 'New', key: 'newest')]
    render_inline(SortToggleComponent.new(options: options))
    assert_selector '.c-sort__seg--active', text: 'New'
  end

  test 'wires sort stimulus controller on segments' do
    options = [Option.new(label: 'New', key: 'newest')]
    render_inline(SortToggleComponent.new(options: options))
    assert_selector "[data-controller='sort']"
    assert_selector "[data-action='click->sort#select']"
  end
end
