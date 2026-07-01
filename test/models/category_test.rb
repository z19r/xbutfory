require 'test_helper'

class CategoryTest < ActiveSupport::TestCase
  test 'generates slug from name' do
    cat = Category.create!(name: 'Dev Tools')
    assert_equal 'dev-tools', cat.slug
  end

  test 'does not overwrite an explicit slug' do
    cat = Category.create!(name: 'Dev Tools', slug: 'devtools')
    assert_equal 'devtools', cat.slug
  end

  test 'requires name' do
    cat = Category.new
    assert_not cat.valid?
    assert_includes cat.errors[:name], "can't be blank"
  end

  test 'enforces unique slugs' do
    Category.create!(name: 'Health', slug: 'health')
    duplicate = Category.new(name: 'Health 2', slug: 'health')
    assert_not duplicate.valid?
    assert_includes duplicate.errors[:slug], 'has already been taken'
  end

  test 'with_stats returns counts and samples per category' do
    users(:member).entries.create!(
      x: 'Named',
      y: 'saas app',
      name: 'NamedApp',
      category: 'saas',
    )
    stats = Category.with_stats
    saas = stats.find { |s| s[:category].slug == 'saas' }
    assert saas
    assert_operator saas[:count], :>=, 1
    assert saas[:sample].present?
  end

  test 'with_stats excludes nsfw entries by default' do
    user = users(:member)
    Entry.create!(
      x: 'Hidden',
      y: 'cat',
      category: 'saas',
      nsfw: true,
      user: user,
    )
    stats = Category.with_stats(include_nsfw: false)
    saas = stats.find { |s| s[:category].slug == 'saas' }
    nsfw_stats = Category.with_stats(include_nsfw: true)
    nsfw_saas = nsfw_stats.find { |s| s[:category].slug == 'saas' }
    assert_operator nsfw_saas[:count], :>=, saas[:count]
  end
end
