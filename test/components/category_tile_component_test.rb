require 'test_helper'

class CategoryTileComponentTest < ViewComponent::TestCase
  test 'renders name, count and sample' do
    render_inline(
      CategoryTileComponent.new(
        name: 'SaaS & Productivity',
        slug: 'saas',
        count: 12,
        sample: 'Notion · Linear',
        color_token: 'cat-saas',
        short_code: 'SAAS',
      ),
    )
    assert_selector "a.c-category-tile[href='/?category=saas']"
    assert_selector '.c-category-tile__name', text: 'SaaS & Productivity'
    assert_text '12 entries'
    assert_text 'Notion · Linear'
    assert_selector '.c-category-tile__chip', text: 'SAAS'
  end

  test 'derives short code from slug when omitted' do
    render_inline(
      CategoryTileComponent.new(name: 'Dev Tools', slug: 'dev-tools', count: 1),
    )
    assert_selector '.c-category-tile__chip', text: 'DEV TOOLS'
  end

  test 'falls back to muted chip color without a token' do
    render_inline(
      CategoryTileComponent.new(name: 'Misc', slug: 'misc', count: 0),
    )
    chip = page.find('.c-category-tile__chip')
    assert_includes chip[:style], 'var(--text-muted)'
  end
end
