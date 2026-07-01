require 'test_helper'

class FooterComponentTest < ViewComponent::TestCase
  test 'renders the masthead colophon' do
    render_inline(FooterComponent.new)
    assert_text 'AN INDEX OF DUBIOUS BRILLIANCE'
  end

  test 'renders the hidden scramble easter-egg button wired to the controller' do
    render_inline(FooterComponent.new)
    assert_selector ".c-footer[data-controller~='scramble']"
    assert_selector "button.c-footer__scramble[data-action='click->scramble#toggle']"
    assert_selector "button.c-footer__scramble[title='do not press']"
  end
end
