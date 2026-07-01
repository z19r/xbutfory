# frozen_string_literal: true

# A curated "X" — the known product a listing is reimagined for. Entries point
# at one via a FK; the admin-managed vocabulary lives here (see approval_flow/).
class Product < ApplicationRecord
  has_many :entries, dependent: :nullify

  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates :slug, presence: true, uniqueness: true

  before_validation :set_slug, if: -> { slug.blank? && name.present? }

  # Find or create by case-insensitive name, filling url on first sight.
  def self.for_name(name, url: nil)
    product = where('lower(name) = ?', name.to_s.strip.downcase).first
    product ||= new(name: name.to_s.strip)
    product.url = url if url.present? && product.url.blank?
    product.save! if product.changed?
    product
  end

  private

  def set_slug
    self.slug = name.to_s.parameterize
  end
end
