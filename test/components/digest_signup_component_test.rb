require "test_helper"

class DigestSignupComponentTest < ViewComponent::TestCase
  test "renders the card with title, pitch, field and cta" do
    render_inline(DigestSignupComponent.new)
    assert_selector ".c-digest[data-controller='digest-signup']"
    assert_selector ".c-digest__title", text: "WEEKLY DIGEST"
    assert_selector ".c-digest__pitch", text: /every Sunday/
    assert_selector "input.c-digest__input[type='email'][data-digest-signup-target='email']"
    assert_selector "button.c-digest__cta", text: "Subscribe"
  end

  test "gel cta by default; flat when gel is false" do
    render_inline(DigestSignupComponent.new)
    assert_selector ".c-digest__cta--gel"

    render_inline(DigestSignupComponent.new(gel: false))
    assert_no_selector ".c-digest__cta--gel"
  end

  test "subscribe posts to the digest endpoint and reports back via the controller" do
    render_inline(DigestSignupComponent.new)
    assert_selector "form.c-digest__form[action='/digest'][method='post']"
    assert_selector "form.c-digest__form[data-action='turbo:submit-end->digest-signup#subscribed']"
  end
end
