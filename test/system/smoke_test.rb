# Launch smoke tests: the three flows that must never break. Deterministic
# selectors only — visual truth lives in design_system/, not here.
require 'application_system_test_case'

class SmokeTest < ApplicationSystemTestCase
  test 'home renders the masthead formula and the feed' do
    visit root_path

    assert_selector 'h1.l-dek'
    assert_selector '.l-chip', text: 'X but for Y'
    assert_selector '.c-card' # at least one listing in the feed
  end

  test 'a member can sign in through the form' do
    sign_in_through_ui(users(:member))

    # Signed-in nav carries the sign-out control (inside the closed account
    # dropdown, so not visible until opened).
    assert_selector "form[action='#{sign_out_path}']", visible: :all
  end

  test 'the After Dark toast survives the reload the toggle triggers' do
    sign_in_through_ui(users(:member))
    visit root_path

    # The "· ON" suffix is written by the Stimulus controller's connect, so
    # waiting for it proves the click below lands after the action is bound.
    # Without this the click can fire first and silently do nothing.
    assert_selector '.c-utility-bar__after-dark', text: 'ON'

    # Marker on the body element only: the toggle's Turbo visit replaces the
    # body, so its disappearance is the signal that the reload has landed.
    page.execute_script("document.body.dataset.preVisit = '1'")
    click_on '🌙 After Dark'
    # Generous wait: CI runners can take several seconds to land the visit.
    assert_no_selector 'body[data-pre-visit]', wait: 10

    # Members start opted in, so the first click is the opt-out.
    assert_selector '#toast.c-toast--visible', text: 'safe-for-work'
  end

  test 'typing X and Y updates the live submit preview' do
    sign_in_through_ui(users(:member))
    visit new_submission_path

    # The controller stamps this on connect; typing before the input->update
    # bindings exist would leave the preview stuck on the placeholder.
    assert_selector '[data-preview-ready]'

    fill_in 'entry[x]', with: 'Slack'
    fill_in 'entry[y]', with: 'cats'

    # Re-dispatch input on both fields. Headless Chrome under CI load has
    # intermittently swallowed the native key events (seen on PRs #20/#23/
    # #26); the synthetic event runs the identical Stimulus action-routing
    # and update path, which is what this smoke test exists to prove.
    %w[xInput yInput].each do |target|
      page.execute_script(
        "document.querySelector('[data-submit-preview-target=\"#{target}\"]')" \
          ".dispatchEvent(new Event('input', { bubbles: true }))",
      )
    end

    assert_preview_shows 'Slack', 'cats'
  end

  private

  # TEMPORARY (flake investigation): assert the preview, and on failure dump
  # everything needed to tell the two remaining hypotheses apart — an empty
  # input (keystrokes lost) versus a re-rendered page (typed state discarded).
  def assert_preview_shows(x, y)
    assert_selector '[data-submit-preview-target="xDisplay"]', text: x
    assert_selector '[data-submit-preview-target="yDisplay"]', text: y
  rescue Minitest::Assertion => e
    warn "\n===== SUBMIT PREVIEW FLAKE DIAGNOSTICS =====\n"
    warn(dump_preview_state.inspect)
    warn "\nNAV LOG: #{page.evaluate_script('window.name')}"
    warn "\nFORM HTML:\n#{page.evaluate_script(FORM_HTML_JS)}"
    warn "\n===== END DIAGNOSTICS =====\n"
    raise e
  end

  FORM_HTML_JS = <<~JS.freeze
    (() => {
      const f = document.querySelector('.c-submit__form');
      return f ? f.outerHTML.slice(0, 2000) : '<<no form>>';
    })()
  JS

  DUMP_STATE_JS = <<~JS.freeze
    (() => {
      const q = (s) => document.querySelector(s);
      const x = q('[data-submit-preview-target="xInput"]');
      const yEl = q('[data-submit-preview-target="yInput"]');
      const root = q('[data-controller~="submit-preview"]');
      // Does a fresh synthetic input still route through Stimulus? If the
      // display changes here, the bindings are live and the inputs were empty.
      let routed = null;
      if (x) {
        const before = q('[data-submit-preview-target="xDisplay"]').textContent;
        x.value = 'PROBE';
        x.dispatchEvent(new Event('input', { bubbles: true }));
        const after = q('[data-submit-preview-target="xDisplay"]').textContent;
        routed = (after === 'PROBE');
        x.value = '';
      }
      return {
        url: location.pathname + location.search,
        readyState: document.readyState,
        previewReady: root ? String(root.dataset.previewReady) : '<<no root>>',
        xValue: x ? x.value : '<<missing>>',
        yValue: yEl ? yEl.value : '<<missing>>',
        xAction: x ? x.getAttribute('data-action') : null,
        inputCount: document.querySelectorAll('[data-submit-preview-target="xInput"]').length,
        displayCount: document.querySelectorAll('[data-submit-preview-target="xDisplay"]').length,
        activeElement: document.activeElement
          ? document.activeElement.tagName + '#' + (document.activeElement.id || '')
          : null,
        navigations: performance.getEntriesByType('navigation').length,
        stimulusRoutesEvents: routed
      };
    })()
  JS

  def dump_preview_state
    page.evaluate_script(DUMP_STATE_JS)
  rescue StandardError => e
    { dump_failed: e.message }
  end
end
