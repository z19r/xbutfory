class Entry < ApplicationRecord
  include AASM

  belongs_to :user
  # The X, normalized: the curated product this listing reimagines. Optional so
  # existing/back-office rows aren't forced; `x` string stays for display/search.
  belongs_to :product, optional: true
  has_many :votes, dependent: :destroy
  has_many :payments, dependent: :destroy

  TIERS = %w[free featured].freeze

  # Lifecycle of a listing. AASM on the `status` column (default live for direct
  # creates — seeds/imports/admin). New user submissions from an untrusted
  # account are set pending in the controller. AASM provides the live?/pending?/
  # needs_edits?/withdrawn? predicates and matching class scopes.
  aasm column: :status do
    state :live, initial: true
    state :pending
    state :needs_edits
    state :withdrawn

    # Admin publishes a queued submission and clears any review note.
    event :approve do
      transitions from: %i[pending needs_edits],
                  to: :live,
                  after: :clear_reviewer_note
    end

    # Admin bounces it back for edits (note set by the controller).
    event :request_changes do
      transitions from: %i[pending live needs_edits], to: :needs_edits
    end

    # Owner edits a needs_edits listing — back into the queue.
    event :resubmit do
      transitions from: :needs_edits, to: :pending
    end

    # Owner hides / restores their listing.
    event :withdraw do
      transitions from: %i[live pending needs_edits], to: :withdrawn
    end

    event :restore do
      transitions from: :withdrawn, to: :live
    end
  end

  validates :x, :y, :slug, presence: true
  validates :slug, uniqueness: true
  validates :tier, inclusion: { in: TIERS }
  # The URL is rendered straight into a `link_to` href. Constrain it to a single
  # http(s) token — fully anchored (\A…\z) and whitespace-free so a `javascript:`
  # scheme can't ride in and a trailing newline can't smuggle a second line past
  # the start anchor.
  validates :url,
            format: {
              with: %r{\Ahttps?://\S+\z}i,
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

  def clear_reviewer_note
    self.reviewer_note = nil
  end

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
