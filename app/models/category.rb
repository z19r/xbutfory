class Category < ApplicationRecord
  validates :name, :slug, presence: true
  validates :slug, uniqueness: true

  before_validation :generate_slug, on: :create

  private

  def generate_slug
    return if slug.present? || name.blank?
    self.slug = name.parameterize
  end
end
