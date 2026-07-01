class TagComponent < ViewComponent::Base
  CATEGORY_HUES = {
    'saas' => 'var(--cat-saas)',
    'dev-tools' => 'var(--cat-dev-tools)',
    'consumer' => 'var(--cat-consumer)',
    'ai-ml' => 'var(--cat-ai-ml)',
    'fintech' => 'var(--cat-fintech)',
    'health' => 'var(--cat-health)',
    'community' => 'var(--cat-community)',
  }.freeze

  def initialize(label:, category: nil)
    @label = label
    @category = category
  end

  def category_style
    hue = CATEGORY_HUES[@category]
    return '' unless hue
    "border-color: #{hue}; color: #{hue};"
  end
end
