require 'test_helper'

class SeoMetaTest < ActionDispatch::IntegrationTest
  test 'the home page carries default description and Open Graph tags' do
    get root_path
    assert_response :success

    assert_select "meta[name='description']" do |els|
      assert_match(/index/i, els.first['content'])
    end
    assert_select "meta[property='og:type'][content='website']"
    assert_select "meta[property='og:title']"
    assert_select "meta[name='twitter:card'][content='summary']"
    assert_select "link[rel='canonical']"
  end

  test 'an entry page carries entry-specific description and article type' do
    entry = entries(:one)
    get entry_path(slug: entry.slug)
    assert_response :success

    assert_select "meta[property='og:type'][content='article']"
    assert_select "meta[property='og:title']" do |els|
      assert_includes els.first['content'], entry.title
    end
  end
end
