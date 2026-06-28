class Category < ApplicationRecord
  validates :name, :slug, presence: true
  validates :slug, uniqueness: true

  before_validation :generate_slug, on: :create

  # Categories with their entry count and a "source apps" sample (top product names),
  # computed in two queries (no N+1). Respects After Dark via include_nsfw.
  def self.with_stats(include_nsfw: false)
    scope = include_nsfw ? Entry.all : Entry.sfw
    counts = scope.group(:category).count
    samples = scope.where.not(name: [nil, ""]).order(votes_count: :desc).to_a
      .group_by(&:category)
      .transform_values { |entries| entries.first(3).map(&:name).join(" · ") }

    order(:name).map do |category|
      { category: category, count: counts[category.slug].to_i, sample: samples[category.slug] }
    end
  end

  private

  def generate_slug
    return if slug.present? || name.blank?
    self.slug = name.parameterize
  end
end
