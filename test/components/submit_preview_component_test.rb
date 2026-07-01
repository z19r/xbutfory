require 'test_helper'

class SubmitPreviewComponentTest < ViewComponent::TestCase
  test 'shows placeholder X and Y when blank' do
    render_inline(SubmitPreviewComponent.new)
    assert_selector '.c-submit-preview__formula--placeholder'
    assert_text 'X'
    assert_text 'Y'
    assert_text 'but for'
  end

  test 'shows provided x and y values' do
    render_inline(SubmitPreviewComponent.new(x: 'Slack', y: 'dogs'))
    assert_text 'Slack'
    assert_text 'dogs'
    assert_no_selector '.c-submit-preview__formula--placeholder'
  end

  test 'renders custom label' do
    render_inline(SubmitPreviewComponent.new(label: 'Preview'))
    assert_selector '.c-submit-preview__label', text: 'Preview'
  end

  test 'exposes stimulus targets for live preview' do
    render_inline(SubmitPreviewComponent.new)
    assert_selector "[data-submit-preview-target='xDisplay']"
    assert_selector "[data-submit-preview-target='yDisplay']"
  end
end
