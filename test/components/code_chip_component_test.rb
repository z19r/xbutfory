require 'test_helper'

class CodeChipComponentTest < ViewComponent::TestCase
  test 'renders x but for y formula' do
    render_inline(CodeChipComponent.new(x: 'Slack', y: 'dogs'))
    assert_selector '.c-code-chip', text: /Slack.*but for.*dogs/
    assert_selector '.c-code-chip em', text: 'but for'
  end
end
