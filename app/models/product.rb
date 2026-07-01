# frozen_string_literal: true

# A curated "X" — the known product a listing is reimagined for. Entries point
# at one via a FK; the admin-managed vocabulary lives here (see approval_flow/).
#
# Approval lifecycle: a user's "Suggest New" X is created `pending`; an admin
# `approve`s (usable) or `reject`s it. Seed/curated X's are approved on import.
class Product < ApplicationRecord
  include AASM

  has_many :entries, dependent: :nullify

  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates :slug, presence: true, uniqueness: true

  before_validation :set_slug, if: -> { slug.blank? && name.present? }

  scope :alphabetical, -> { order(:name) }

  # AASM creates .pending / .approved / .rejected scopes and predicates.
  aasm column: :state do
    state :pending, initial: true
    state :approved
    state :rejected

    event :approve do
      transitions from: %i[pending rejected], to: :approved, after: :stamp_approved_at
    end

    event :reject do
      transitions from: %i[pending approved], to: :rejected
    end
  end

  # Find or create by case-insensitive name, filling url on first sight.
  # Pass approved: true to stamp curated/admin X's as usable immediately.
  def self.for_name(name, url: nil, approved: false)
    product = where('lower(name) = ?', name.to_s.strip.downcase).first
    product ||= create!(name: name.to_s.strip, url: url)
    product.update!(url: url) if url.present? && product.url.blank?
    product.approve! if approved && product.may_approve?
    product
  end

  private

  def stamp_approved_at
    self.approved_at = Time.current
  end

  def set_slug
    self.slug = name.to_s.parameterize
  end
end
