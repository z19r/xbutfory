class CategoryTileComponent < ViewComponent::Base
  def initialize(
    name:,
    slug:,
    count: 0,
    color_token: nil,
    sample: nil,
    short_code: nil
  )
    @name = name
    @slug = slug
    @count = count
    @color_token = color_token
    @sample = sample
    @short_code = short_code
  end

  def chip_color
    return "var(--#{@color_token})" if @color_token.present?
    'var(--text-muted)'
  end

  def short_code
    @short_code.presence || @slug.upcase.tr('-', ' ')
  end
end
