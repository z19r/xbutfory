require 'test_helper'

class MarkdownResponsesTest < ActionDispatch::IntegrationTest
  MARKDOWN = { 'Accept' => 'text/markdown' }.freeze

  test 'home responds with markdown when Accept: text/markdown is sent' do
    get root_path, headers: MARKDOWN

    assert_response :success
    assert_equal 'text/markdown', response.media_type
    assert_includes response.body, '# XbutforY'
    assert_includes response.body, 'Tinder *but for* the building you live in'
    assert_includes response.body, 'Swipe on your neighbors.'
  end

  test 'home markdown links each entry to its detail page' do
    get root_path, headers: MARKDOWN

    slug = entries(:one).slug
    assert_includes response.body, "(#{entry_url(slug)})"
  end

  test 'home markdown is not HTML-escaped' do
    get root_path, headers: MARKDOWN

    assert_not_includes response.body, '&amp;'
    assert_not_includes response.body, '<html'
  end

  test 'entry detail responds with markdown when requested' do
    entry = entries(:one)
    get entry_path(entry.slug), headers: MARKDOWN

    assert_response :success
    assert_equal 'text/markdown', response.media_type
    assert_includes response.body,
                    "# #{entry.x} *but for* #{entry.y}"
    assert_includes response.body, entry.description
    assert_includes response.body, "#{entry.votes_count} votes"
  end

  test 'categories index responds with markdown when requested' do
    get categories_path, headers: MARKDOWN

    assert_response :success
    assert_equal 'text/markdown', response.media_type
    assert_includes response.body, '# Browse by Category'
    assert_includes response.body, categories(:one).name
  end

  test 'home still responds with HTML without the header' do
    get root_path

    assert_response :success
    assert_equal 'text/html', response.media_type
  end

  test 'browser-style Accept headers still get HTML' do
    get root_path,
        headers: {
          'Accept' =>
            'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        }

    assert_response :success
    assert_equal 'text/html', response.media_type
  end
end
