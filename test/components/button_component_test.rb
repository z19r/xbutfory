require 'test_helper'

class ButtonComponentTest < ViewComponent::TestCase
  test 'renders primary button' do
    render_inline(ButtonComponent.new(variant: 'primary')) { 'Click me' }
    assert_selector 'button.c-btn--primary', text: 'Click me'
  end

  test 'renders as link when href provided' do
    render_inline(ButtonComponent.new(href: '/test')) { 'Link' }
    assert_selector "a.c-btn[href='/test']", text: 'Link'
  end

  test 'renders trailing arrow' do
    render_inline(ButtonComponent.new(trailing_arrow: true)) { 'Go' }
    assert_text '→'
  end

  test 'renders disabled state' do
    render_inline(ButtonComponent.new(disabled: true)) { 'No' }
    assert_selector '.c-btn--disabled'
  end

  test 'applies size class' do
    render_inline(ButtonComponent.new(size: 'lg')) { 'Big' }
    assert_selector '.c-btn--lg'
  end

  test 'gel adds the glossy maximal overlay class' do
    render_inline(ButtonComponent.new(gel: true)) { 'Submit' }
    assert_selector '.c-btn--gel'
  end

  test 'no gel class by default' do
    render_inline(ButtonComponent.new) { 'Plain' }
    assert_no_selector '.c-btn--gel'
  end
end
