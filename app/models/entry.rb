class Entry < ApplicationRecord
  has_many :votes, dependent: :destroy

  validates :x, :y, :submitter, :slug, presence: true
  validates :slug, uniqueness: true

  before_validation :generate_slug, on: :create

  scope :latest, -> { order(created_at: :desc) }
  scope :trending, -> { order(votes_count: :desc, created_at: :desc) }
  scope :by_category, ->(cat) { where(category: cat) }
  scope :search, ->(q) {
    term = "%#{sanitize_sql_like(q)}%"
    where("x ILIKE :t OR y ILIKE :t OR description ILIKE :t", t: term)
  }

  def title = "#{x} but for #{y}"

  private

  def generate_slug
    return if slug.present?
    self.slug = "#{x}-but-for-#{y}".parameterize
  end
end
