# The sticky nav must sit flush with the top of the viewport unless a
# StartupBar is really there. The widget is a third-party embed and is blocked
# in tests, so drive the controller with the signal it keys off: the body
# padding the loader applies.
require 'application_system_test_case'

class StartupbarOffsetTest < ApplicationSystemTestCase
  test 'the nav sits flush with the top when no StartupBar is present' do
    visit root_path

    assert_equal 0, offset_var, '--startupbar-h should be 0 with no bar'
    # Sticky only pins once the page scrolls past the nav's own position.
    scroll_past_nav
    assert_equal 0, nav_top, 'nav should stick flush with the viewport top'
  end

  # The regression: asking for the widget used to reserve 36px unconditionally,
  # so a blocked or empty StartupBar left the nav floating below a bar that was
  # never drawn. External hosts are blocked here, so the widget cannot load —
  # which is exactly the failure this guards.
  test 'requesting a StartupBar that never renders leaves the nav flush' do
    with_startupbar_requested do
      visit root_path

      assert_selector "body[data-controller~='startupbar-offset']",
                      visible: :all
      assert_equal 0, offset_var, 'a bar that never rendered must reserve 0'
      scroll_past_nav
      assert_equal 0, nav_top
    end
  end

  test 'the nav shifts down by the height a StartupBar actually occupies' do
    visit root_path
    with_startupbar_offset_controller

    simulate_startupbar(36)

    assert_equal 36, offset_var
    scroll_past_nav
    assert_equal 36, nav_top, 'nav should clear the bar, not hide under it'
  end

  test 'the nav returns to the top if the StartupBar goes away' do
    visit root_path
    with_startupbar_offset_controller

    simulate_startupbar(36)
    assert_equal 36, offset_var

    simulate_startupbar(0)

    assert_equal 0, offset_var, 'a removed bar should release the offset'
  end

  private

  # STARTUPBAR_PREVIEW is the documented way to render the widget outside
  # production, and is what startupbar_enabled? checks besides the env.
  def with_startupbar_requested
    previous = ENV.fetch('STARTUPBAR_PREVIEW', nil)
    ENV['STARTUPBAR_PREVIEW'] = '1'
    yield
  ensure
    ENV['STARTUPBAR_PREVIEW'] = previous
  end

  # Production sets this in the layout; test renders without the widget, so
  # attach the controller explicitly to exercise it.
  def with_startupbar_offset_controller
    page.execute_script(
      "document.body.setAttribute('data-controller', " \
        "((document.body.getAttribute('data-controller') || '') + " \
        "' startupbar-offset').trim())",
    )
    # Stimulus connects on the next mutation-observer tick.
    assert_selector "body[data-controller~='startupbar-offset']", wait: 5
  end

  def simulate_startupbar(height)
    page.execute_script("document.body.style.paddingTop = '#{height}px'")
    # The controller measures once per animation frame.
    sleep 0.2
  end

  def offset_var
    page.evaluate_script(
      "parseFloat(getComputedStyle(document.documentElement)" \
        ".getPropertyValue('--startupbar-h')) || 0",
    ).to_i
  end

  def scroll_past_nav
    page.execute_script('window.scrollTo(0, 1200)')
    sleep 0.2
  end

  def nav_top
    page.evaluate_script(
      "Math.round(document.querySelector('.c-glossy-nav')" \
        '.getBoundingClientRect().top)',
    ).to_i
  end
end
