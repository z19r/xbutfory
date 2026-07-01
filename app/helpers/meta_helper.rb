# Per-page SEO + social metadata. Views set the specifics with
# `content_for :meta_description` (and optionally :meta_title / :og_type);
# everything else falls back to sensible site defaults.
module MetaHelper
  SITE_NAME = 'XbutforY'
  DEFAULT_TITLE = 'XbutforY — a directory of “X, but for Y”'
  DEFAULT_DESCRIPTION =
    'A hand-curated, human-voted index of “X, but for Y” — a known product ' \
      'reimagined for a niche. Updated daily.'

  def page_title
    content_for(:title).presence || DEFAULT_TITLE
  end

  def meta_description
    content_for(:meta_description).presence || DEFAULT_DESCRIPTION
  end

  def canonical_url
    request.base_url + request.path
  end

  def social_image_url
    request.base_url + '/icon.png'
  end

  # Open Graph + Twitter card tags. We keep a "summary" card (no hero image —
  # the brand is purely typographic) and point og:image at the app icon.
  def social_meta_tags
    safe_join(
      [
        tag.meta(name: 'description', content: meta_description),
        tag.link(rel: 'canonical', href: canonical_url),

        tag.meta(property: 'og:site_name', content: SITE_NAME),
        tag.meta(property: 'og:type', content: content_for(:og_type).presence || 'website'),
        tag.meta(property: 'og:title', content: page_title),
        tag.meta(property: 'og:description', content: meta_description),
        tag.meta(property: 'og:url', content: canonical_url),
        tag.meta(property: 'og:image', content: social_image_url),

        tag.meta(name: 'twitter:card', content: 'summary'),
        tag.meta(name: 'twitter:title', content: page_title),
        tag.meta(name: 'twitter:description', content: meta_description),
        tag.meta(name: 'twitter:image', content: social_image_url),
      ],
      "\n",
    )
  end
end
