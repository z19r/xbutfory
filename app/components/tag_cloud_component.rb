# A weighted tag cloud — the classic Web 2.0 sidebar widget. Each tag's font-size
# and opacity scale with its weight (1–5) so popular tags read loudest. Links are
# quiet periwinkle, deliberately off the brand accent.
# Mirrors design_system/components/discovery/TagCloud.jsx.
class TagCloudComponent < ViewComponent::Base
  Tag = Data.define(:label, :weight, :href)

  def initialize(tags:)
    @tags = tags.map do |t|
      next t if t.is_a?(Tag)

      Tag.new(label: t[:label], weight: (t[:weight] || 3), href: t[:href] || "#")
    end
  end

  # font-size 11 + weight*2.6 ; opacity 0.6 + weight*0.08 — straight from the JSX.
  def font_size(weight)
    (11 + weight * 2.6).round(2)
  end

  def opacity(weight)
    (0.6 + weight * 0.08).round(2)
  end

  def heavy?(weight)
    weight >= 4
  end
end
