require 'test_helper'

class TagComponentTest < ViewComponent::TestCase
  test 'renders label without category styling' do
    render_inline(TagComponent.new(label: 'general'))
    assert_selector '.c-tag', text: 'general'
    tag = page.find('.c-tag')
    assert_equal '', tag[:style].to_s.strip
  end

  test 'applies category hue when category is known' do
    render_inline(TagComponent.new(label: 'saas', category: 'saas'))
    tag = page.find('.c-tag')
    assert_includes tag[:style], 'var(--cat-saas)'
  end
end
