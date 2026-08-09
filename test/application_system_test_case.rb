require 'test_helper'

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  # External hosts are blocked (resolved to localhost so requests fail fast):
  # Google Fonts' late display=swap reflow shifts the layout seconds into a
  # slow CI run, and Selenium clicks/keys computed against the pre-swap
  # geometry land on nothing. Fallback fonts render immediately and the page
  # never reflows.
  #
  # The backgrounding flags fix a separate, longer-running flake. A headless
  # window counts as occluded, so Chrome deprioritises its renderer; when CI
  # is loaded, the synthesised key and pointer events are then silently
  # dropped. WebDriver still reports success — it focuses the element and
  # returns — so a click produces no click event at all and fill_in leaves
  # the field empty, with no error to retry on. Captured directly in CI:
  # activeElement was the focused input while its value stayed "", and the
  # After Dark click logged no trusted click event in the capture phase,
  # while Stimulus bindings were provably live the whole time.
  driven_by :selenium,
            using: :headless_chrome,
            screen_size: [1400, 900] do |options|
    options.add_argument(
      '--host-resolver-rules=' \
        'MAP fonts.googleapis.com 127.0.0.1,' \
        'MAP fonts.gstatic.com 127.0.0.1,' \
        'MAP startupbar.co 127.0.0.1,' \
        'MAP cloud.umami.is 127.0.0.1',
    )
    options.add_argument('--disable-renderer-backgrounding')
    options.add_argument('--disable-backgrounding-occluded-windows')
    options.add_argument('--disable-background-timer-throttling')
  end

  # TEMPORARY (flake investigation): record navigations and Turbo visits into
  # window.name, which survives same-origin navigation, so a failing test can
  # show whether the page was re-rendered underneath it.
  NAV_RECORDER_JS = <<~JS.freeze
    (() => {
      const log = (m) => { try { window.name = (window.name || '') + '|' + m; } catch (e) {} };
      log('LOAD:' + location.pathname + location.search);
      window.addEventListener('error', (e) => log(
        'JSERROR:' + (e.message || '') + '@' + (e.filename || '') + ':' + (e.lineno || '')
      ), true);
      window.addEventListener('unhandledrejection', (e) => log(
        'REJECTION:' + ((e.reason && (e.reason.message || e.reason)) || '')
      ));
      log('TURBO:' + (typeof window.Turbo));
      const t0 = performance.now();
      const at = () => '@' + Math.round(performance.now() - t0) + 'ms';
      [
        'turbo:click', 'turbo:before-visit', 'turbo:visit', 'turbo:before-cache',
        'turbo:before-render', 'turbo:render', 'turbo:load',
        'turbo:before-fetch-request', 'turbo:before-fetch-response',
        'turbo:fetch-request-error', 'turbo:frame-missing'
      ].forEach((n) => document.addEventListener(n, (e) => {
        log(n + ':' + ((e.detail && e.detail.url) || '') + at());
      }));
      // What does a real click actually hit? Capture phase, so nothing can
      // stop this from seeing the event Chrome dispatched.
      window.addEventListener('click', (e) => {
        const el = e.target;
        log('CLICK:' + (el.tagName || '?') + '.' + (el.className || '') +
            '[' + Math.round(e.clientX) + ',' + Math.round(e.clientY) + ']' +
            (e.isTrusted ? 'trusted' : 'synthetic') + at());
      }, true);
      window.addEventListener('beforeunload', () => log('UNLOAD' + at()));
    })();
  JS

  setup do
    page.driver.browser.execute_cdp(
      'Page.addScriptToEvaluateOnNewDocument', source: NAV_RECORDER_JS
    )
  rescue StandardError => e
    warn "nav recorder unavailable: #{e.message}"
  end

  # TEMPORARY (flake investigation): any failing system test dumps the click
  # and Turbo lifecycle log, so a no-op click is visible wherever it happens
  # — including inside sign_in_through_ui.
  teardown do
    next if passed?

    warn "\n===== NAV/CLICK LOG (#{name}) =====\n"
    warn page.evaluate_script('window.name').to_s.tr('|', "\n")
    warn "\nURL: #{page.current_url}"
    warn "\n===== END LOG =====\n"
  rescue StandardError => e
    warn "log dump unavailable: #{e.message}"
  end

  # TEMPORARY (flake investigation): the browser state at the instant an
  # interaction goes missing. WebDriver reports success either way, so this is
  # the only way to see which precondition differs on a dropped event.
  ENV_PROBE_JS = <<~JS.freeze
    (() => ({
      visibility: document.visibilityState,
      hasFocus: document.hasFocus(),
      activeElement: document.activeElement
        ? document.activeElement.tagName + '#' + (document.activeElement.id || '')
        : null,
      inner: window.innerWidth + 'x' + window.innerHeight,
      outer: window.outerWidth + 'x' + window.outerHeight,
      scroll: window.scrollX + ',' + window.scrollY,
      dpr: window.devicePixelRatio,
      readyState: document.readyState
    }))()
  JS

  def env_probe
    page.evaluate_script(ENV_PROBE_JS)
  rescue StandardError => e
    { probe_failed: e.message }
  end

  def click_count
    page.evaluate_script("(window.name || '').split('CLICK:').length - 1")
  rescue StandardError
    -1
  end

  # Click, then confirm the browser actually dispatched a click. If it did
  # not, dump every precondition plus the window handles — WebDriver raises
  # nothing here, so without this the loss is invisible.
  def click_and_confirm(locator, **opts)
    before_env = env_probe
    before_count = click_count
    handles = page.driver.browser.window_handles.length

    click_on locator, **opts

    landed = false
    20.times do
      break landed = true if click_count > before_count

      sleep 0.05
    end
    return if landed

    warn "\n===== DROPPED CLICK (#{locator.inspect}) =====\n"
    warn "handles=#{handles} before=#{before_env.inspect}"
    warn "after=#{env_probe.inspect}"
    warn "===== END DROPPED CLICK =====\n"
  end

  # Sign in through the real form — system tests exercise the whole UI stack,
  # so no request-level shortcuts here.
  def sign_in_through_ui(user, password: 'password')
    visit sign_in_path
    fill_in 'login', with: user.email
    fill_in 'password', with: password
    # Scoped: the top nav's SIGN IN link also smart-matches "Sign in".
    within('.c-auth-form') { click_and_confirm 'Sign in' }
    warn "post-fill env: #{env_probe.inspect}" unless ENV['QUIET_PROBE']
    # Block until the redirect lands (signed-in nav carries the sign-out
    # form, hidden inside the account dropdown) — otherwise a caller's next
    # visit can interrupt the in-flight POST and drop the session.
    assert_selector "form[action='#{sign_out_path}']", visible: :all
  end
end
