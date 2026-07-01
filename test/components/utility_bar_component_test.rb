require 'test_helper'

class UtilityBarComponentTest < ViewComponent::TestCase
  test 'renders issue line with live dot' do
    render_inline(UtilityBarComponent.new)
    assert_selector '.c-utility-bar__live-dot'
    assert_selector '.c-utility-bar__issue'
  end

  test 'renders After Dark toggle' do
    render_inline(UtilityBarComponent.new)
    assert_selector '.c-utility-bar__after-dark', text: /After Dark/
    assert_selector "[data-controller='after-dark']"
    assert_selector "[data-action='click->after-dark#toggle']"
  end

  test 'renders sign in and create account links when signed out' do
    render_inline(UtilityBarComponent.new)
    assert_selector "a[href='/sign_in']", text: 'Sign in'
    assert_selector "a[href='/sign_up']", text: 'Create account'
    assert_no_selector '.c-account-menu'
  end

  test 'swaps the links for the account menu when signed in' do
    render_inline(UtilityBarComponent.new(current_user: users(:member)))
    assert_selector '.c-account-menu__handle', text: '@member'
    assert_no_selector "a[href='/sign_in']"
  end

  test 'renders one accent swatch per theme option, wired to the theme controller' do
    render_inline(UtilityBarComponent.new)
    assert_selector "[data-controller='theme']"
    assert_selector '.c-utility-bar__swatch',
                    count: UtilityBarComponent::ACCENTS.size
    assert_selector "[data-action='click->theme#select']",
                    count: UtilityBarComponent::ACCENTS.size
  end

  test 'marks the magenta swatch active by default' do
    render_inline(UtilityBarComponent.new)
    assert_selector ".c-utility-bar__swatch--on[aria-pressed='true']", count: 1
    assert_selector ".c-utility-bar__swatch--on[data-theme-key-param='magenta']"
  end

  test 'marks the requested accent active when one is supplied' do
    render_inline(UtilityBarComponent.new(active_accent: 'teal'))
    assert_selector ".c-utility-bar__swatch--on[data-theme-key-param='teal']"
    assert_selector ".c-utility-bar__swatch--on[data-theme-key-param='magenta']",
                    count: 0
  end

  test 'resolve_accent falls back to the default for unknown keys' do
    assert_equal 'magenta', UtilityBarComponent.resolve_accent('bogus')[:key]
    assert_equal 'teal', UtilityBarComponent.resolve_accent('teal')[:key]
  end
end
