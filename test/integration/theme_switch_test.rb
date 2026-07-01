require 'test_helper'

# The accent is the one theme knob. A persisted choice (cookie) must be applied
# inline on <html> so there is no flash of the default magenta before JS runs,
# and the matching swatch must read as active.
class ThemeSwitchTest < ActionDispatch::IntegrationTest
  test 'a persisted accent cookie themes the document inline' do
    cookies[:accent] = 'teal'
    get root_url
    assert_response :success
    assert_select 'html[style*=?]', '--accent: var(--accent-teal)'
    assert_select ".c-utility-bar__swatch--on[data-theme-key-param='teal']"
  end

  test 'without a cookie the default magenta accent is active' do
    get root_url
    assert_response :success
    assert_select ".c-utility-bar__swatch--on[data-theme-key-param='magenta']"
  end

  test 'an unknown accent cookie falls back to the default' do
    cookies[:accent] = 'chartreuse'
    get root_url
    assert_response :success
    assert_select ".c-utility-bar__swatch--on[data-theme-key-param='magenta']"
  end
end
