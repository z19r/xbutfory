# frozen_string_literal: true

require 'test_helper'
require 'tempfile'

class SiteImporterTest < ActiveSupport::TestCase
  test 'no-ops and leaves entries untouched when the file is absent' do
    before = Entry.count
    assert_equal 0, SiteImporter.new(Rails.root.join('does_not_exist.json')).call
    assert_equal before, Entry.count
  end

  test 'wipes existing listings and loads the curated set' do
    assert_operator Entry.count, :>, 0, 'fixtures should provide demo entries'

    json = [
      {
        x: 'Notion',
        y: 'dentists',
        url: 'https://example.com',
        tagline: 'notes, but with a drill',
        category: 'productivity',
      },
      { x: 'Uber', y: 'tractors', tier: 'featured', nsfw: true },
    ]

    count = import(json)

    assert_equal 2, count
    assert_equal 2, Entry.count
    notion = Entry.find_by(x: 'Notion')
    assert_equal 'dentists', notion.y
    assert_equal 'https://example.com', notion.url
    assert_equal 'xbutfory', notion.user.handle
    assert Entry.find_by(x: 'Uber').nsfw?
    assert_equal 'featured', Entry.find_by(x: 'Uber').tier
  end

  test 'accepts an entries-wrapped object' do
    assert_equal 1, import({ entries: [{ x: 'Figma', y: 'florists' }] })
    assert Entry.exists?(x: 'Figma', y: 'florists')
  end

  private

  def import(payload)
    file = Tempfile.new(['sites', '.json'])
    file.write(JSON.generate(payload))
    file.close
    SiteImporter.new(file.path).call
  ensure
    file&.unlink
  end
end
