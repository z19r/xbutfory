class CategoryTileComponent < ViewComponent::Base
  def initialize(name:, slug:, count: 0, color_token: nil, sample: nil)
    @name = name
    @slug = slug
    @count = count
    @color_token = color_token
    @sample = sample
  end

  def chip_color
    return "var(--#{@color_token})" if @color_token.present?
    "var(--text-muted)"
  end

  def short_code
    @slug.upcase.tr("-", " ")
  end
end
