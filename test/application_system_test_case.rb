require 'test_helper'

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  # External hosts are blocked (resolved to localhost so requests fail fast):
  # Google Fonts' late display=swap reflow shifts the layout seconds into a
  # slow CI run, and Selenium clicks/keys computed against the pre-swap
  # geometry land on nothing — the source of every smoke-test flake to date.
  # Fallback fonts render immediately and the page never reflows.
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

  # Sign in through the real form — system tests exercise the whole UI stack,
  # so no request-level shortcuts here.
  def sign_in_through_ui(user, password: 'password')
    visit sign_in_path
    fill_in 'login', with: user.email
    fill_in 'password', with: password
    # Scoped: the top nav's SIGN IN link also smart-matches "Sign in".
    within('.c-auth-form') { click_on 'Sign in' }
    # Block until the redirect lands (signed-in nav carries the sign-out
    # form, hidden inside the account dropdown) — otherwise a caller's next
    # visit can interrupt the in-flight POST and drop the session.
    assert_selector "form[action='#{sign_out_path}']", visible: :all
  end
end
