require 'test_helper'

class ToastComponentTest < ViewComponent::TestCase
  test 'renders toast container with message' do
    render_inline(ToastComponent.new(message: 'Saved.'))
    assert_selector ".c-toast[data-controller='toast']", visible: :all
    assert_text 'Saved.'
  end

  test 'starts hidden for the stimulus controller to reveal' do
    render_inline(ToastComponent.new(message: 'Hi'))
    assert_selector '.c-toast[hidden]', visible: :all
  end
end
