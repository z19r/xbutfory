# frozen_string_literal: true

# Replaces the demo/seed listings with the real, curated set from a
# `data/xbutfory.json` blob. Each unique X becomes a `Product` row and entries
# reference it by FK (the `x` string is kept denormalized for display/search).
#
# Shape (a bare array, or `{ "entries" | "sites": [...] }`) of rows like:
#
#   {
#     "site":  "Swimply",                 # the listing's own name
#     "x":     "Airbnb",                  # the known product (-> Product FK)
#     "x_url": "https://airbnb.com",      # the product's canonical URL
#     "y":     "swimming pools",          # the niche
#     "y_url": "https://swimply.com",     # the listing's URL
#     "category": "rentals",
#     "adult": false,                     # -> nsfw
#     "desc":  "Rent private pools by the hour"
#   }
#
# Absent file → no-op (so `db:seed` still works before the blob is provided).
# When present, ALL entries and products are wiped and replaced (votes cascade).
class SiteImporter
  SOURCE = Rails.root.join('data/xbutfory.json')
  CURATOR_HANDLE = 'xbutfory'

  def self.source_present?(path = SOURCE)
    File.exist?(path)
  end

  def self.call(path: SOURCE)
    new(path).call
  end

  def initialize(path = SOURCE)
    @path = Pathname(path)
  end

  def call
    unless @path.exist?
      Rails.logger.info("[SiteImporter] #{@path} not found — skipping import.")
      return 0
    end

    records = parse
    return 0 if records.empty?

    Entry.transaction do
      Entry.destroy_all # votes cascade via dependent: :destroy
      Product.destroy_all
      records.each { |attrs| create_entry!(attrs) }
    end
    records.size
  end

  private

  def parse
    data = JSON.parse(@path.read)
    list =
      if data.is_a?(Array)
        data
      else
        data['entries'] || data['sites'] || []
      end
    list.map { |row| row.to_h.transform_keys(&:to_s) }
  end

  # A single editorial account owns every curated listing (entries.user_id is
  # NOT NULL). Confirmed so the listings are treated as first-class.
  def curator
    @curator ||=
      User.find_or_create_by!(handle: CURATOR_HANDLE) do |user|
        user.email = 'curated@xbutfory.example'
        user.display_name = 'XbutforY'
        user.password = SecureRandom.hex(16)
        user.confirmed_at = Time.current
      end
  end

  def create_entry!(attrs)
    x = attrs['x']
    product = x.present? ? Product.for_name(x, url: attrs['x_url']) : nil

    curator.entries.create!(
      x: x,
      product: product,
      y: attrs['y'],
      url: attrs['y_url'] || attrs['url'],
      name: attrs['site'] || attrs['name'],
      description: attrs['desc'] || attrs['description'],
      category: attrs['category'],
      tier: attrs.fetch('tier', 'free'),
      status: attrs.fetch('status', 'live'),
      nsfw: attrs['adult'] || attrs['nsfw'] || false
    )
  end
end
