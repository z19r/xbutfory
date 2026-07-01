require 'test_helper'

class SitemapsControllerTest < ActionDispatch::IntegrationTest
  test 'renders an XML sitemap listing live entries' do
    get sitemap_path(format: :xml)
    assert_response :success
    assert_equal 'application/xml', response.media_type
    assert_match root_url, response.body
    assert_match entry_url(slug: entries(:one).slug), response.body
  end

  test 'omits pending and nsfw listings' do
    hidden =
      Entry.create!(
        user: users(:member),
        x: 'Secret',
        y: 'nobody',
        tier: 'free',
        status: 'pending',
      )
    spicy =
      Entry.create!(
        user: users(:member),
        x: 'Spicy',
        y: 'adults',
        tier: 'free',
        nsfw: true,
      )

    get sitemap_path(format: :xml)
    assert_no_match entry_url(slug: hidden.slug), response.body
    assert_no_match entry_url(slug: spicy.slug), response.body
  end
end
