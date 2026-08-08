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

    fill_in 'entry[x]', with: 'Slack'
    fill_in 'entry[y]', with: 'cats'

    assert_selector '[data-submit-preview-target="xDisplay"]', text: 'Slack'
    assert_selector '[data-submit-preview-target="yDisplay"]', text: 'cats'
  end
end
