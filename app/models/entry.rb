class Entry < ApplicationRecord
  belongs_to :user
  has_many :votes, dependent: :destroy

  TIERS = %w[free featured].freeze

  # Lifecycle of a listing (see MIGRATION.md). DB-backed string enum, default live.
  enum :status,
       {
         live: "live",
         pending: "pending",
         needs_edits: "needs_edits",
         withdrawn: "withdrawn"
       },
       default: "live"

  validates :x, :y, :slug, presence: true
  validates :slug, uniqueness: true
  validates :tier, inclusion: { in: TIERS }

  before_validation :generate_slug, on: :create

  def featured? = tier == "featured"

  scope :latest, -> { order(created_at: :desc) }
  scope :trending, -> { order(votes_count: :desc, created_at: :desc) }
  scope :by_category, ->(cat) { where(category: cat) }
  scope :sfw, -> { where(nsfw: false) }
  scope :search,
        ->(q) do
          term = "%#{sanitize_sql_like(q)}%"
          where("x ILIKE :t OR y ILIKE :t OR description ILIKE :t", t: term)
        end

  def title = "#{x} but for #{y}"

  private

  def generate_slug
    return if slug.present?
    self.slug = "#{x}-but-for-#{y}".parameterize
  end
end
