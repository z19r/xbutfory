class Entry < ApplicationRecord
  belongs_to :user
  # The X, normalized: the curated product this listing reimagines. Optional so
  # existing/back-office rows aren't forced; `x` string stays for display/search.
  belongs_to :product, optional: true
  has_many :votes, dependent: :destroy
  has_many :payments, dependent: :destroy

  TIERS = %w[free featured].freeze

  # Lifecycle of a listing (see MIGRATION.md). DB-backed string enum, default live.
  enum :status,
       {
         live: 'live',
         pending: 'pending',
         needs_edits: 'needs_edits',
         withdrawn: 'withdrawn',
       },
       default: 'live'

  validates :x, :y, :slug, presence: true
  validates :slug, uniqueness: true
  validates :tier, inclusion: { in: TIERS }
  # The URL is rendered straight into a `link_to` href. Constrain it to http(s)
  # so a submitted `javascript:`/`data:` scheme can't ride into the markup.
  validates :url,
            format: {
              with: %r{\Ahttps?://}i,
              message: 'must start with http:// or https://',
            },
            allow_blank: true

  # A human submitting a listing must pitch it in one line. Enforced only when
  # the controller sets require_pitch, so seeds/imports/back-office creates are
  # free to omit it.
  attr_accessor :require_pitch

  validates :description, presence: true, if: :require_pitch

  before_validation :generate_slug, on: :create

  def featured? = tier == 'featured'

  scope :latest, -> { order(created_at: :desc) }
  scope :trending, -> { order(votes_count: :desc, created_at: :desc) }
  scope :by_category, ->(cat) { where(category: cat) }
  scope :sfw, -> { where(nsfw: false) }
  scope :search,
        ->(q) do
          term = "%#{sanitize_sql_like(q)}%"
          where('x ILIKE :t OR y ILIKE :t OR description ILIKE :t', t: term)
        end

  def title = "#{x} but for #{y}"

  private

  def generate_slug
    return if slug.present?

    base = "#{x}-but-for-#{y}".parameterize
    candidate = base
    n = 1
    # Two distinct sites can share an "X but for Y" formula; disambiguate.
    while Entry.where(slug: candidate).where.not(id: id).exists?
      n += 1
      candidate = "#{base}-#{n}"
    end
    self.slug = candidate
  end
end
