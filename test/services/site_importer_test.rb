# frozen_string_literal: true

require 'test_helper'
require 'tempfile'

class SiteImporterTest < ActiveSupport::TestCase
  test 'no-ops and leaves entries untouched when the file is absent' do
    before = Entry.count
    assert_equal 0, SiteImporter.new(Rails.root.join('does_not_exist.json')).call
    assert_equal before, Entry.count
  end

  test 'wipes existing listings and loads the curated set with product FKs' do
    assert_operator Entry.count, :>, 0, 'fixtures should provide demo entries'

    json = [
      {
        site: 'Swimply',
        x: 'Airbnb',
        x_url: 'https://airbnb.com',
        y: 'swimming pools',
        y_url: 'https://swimply.com',
        category: 'rentals',
        adult: false,
        desc: 'Rent private pools by the hour',
      },
      {
        site: 'Naughtly',
        x: 'Airbnb',
        y: 'red rooms',
        adult: true,
      },
    ]

    count = import(json)

    assert_equal 2, count
    assert_equal 2, Entry.count
    # Both rows share one X -> a single deduplicated Product.
    assert_equal 1, Product.count
    airbnb = Product.find_by!(name: 'Airbnb')
    assert_equal 'https://airbnb.com', airbnb.url
    assert_equal 'airbnb', airbnb.slug

    swimply = Entry.find_by!(x: 'Airbnb', y: 'swimming pools')
    assert_equal airbnb, swimply.product
    assert_equal 'https://swimply.com', swimply.url
    assert_equal 'Swimply', swimply.name
    assert_equal 'Rent private pools by the hour', swimply.description
    assert_equal 'xbutfory', swimply.user.handle
    assert Entry.find_by!(y: 'red rooms').nsfw?
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
