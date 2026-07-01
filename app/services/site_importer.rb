# frozen_string_literal: true

# Replaces the demo/seed listings with the real, curated set from a
# `xbutfory.json` blob at the project root.
#
# Shape (either a bare array or `{ "entries": [...] }` / `{ "sites": [...] }`):
#
#   [
#     {
#       "x": "Notion",            # required — the known product
#       "y": "dentists",          # required — the niche
#       "url": "https://…",
#       "tagline": "…",
#       "why": "…",
#       "description": "…",
#       "category": "productivity",
#       "stamp": "NEW",
#       "tier": "free",           # free | featured (default free)
#       "status": "live",         # default live
#       "nsfw": false
#     }
#   ]
#
# Absent file → no-op (so `db:seed` still works before the blob is provided).
# When present, ALL existing entries are wiped and replaced (votes cascade).
class SiteImporter
  SOURCE = Rails.root.join('xbutfory.json')
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
    curator.entries.create!(
      x: attrs.fetch('x'),
      y: attrs.fetch('y'),
      url: attrs['url'],
      tagline: attrs['tagline'],
      why: attrs['why'],
      description: attrs['description'],
      category: attrs['category'],
      name: attrs['name'],
      stamp: attrs['stamp'],
      tier: attrs.fetch('tier', 'free'),
      status: attrs.fetch('status', 'live'),
      nsfw: attrs.fetch('nsfw', false)
    )
  end
end
