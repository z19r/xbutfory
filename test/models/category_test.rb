require "test_helper"

class CategoryTest < ActiveSupport::TestCase
  test "generates slug from name" do
    cat = Category.create!(name: "Dev Tools")
    assert_equal "dev-tools", cat.slug
  end

  test "does not overwrite an explicit slug" do
    cat = Category.create!(name: "Dev Tools", slug: "devtools")
    assert_equal "devtools", cat.slug
  end

  test "requires name" do
    cat = Category.new
    assert_not cat.valid?
    assert_includes cat.errors[:name], "can't be blank"
  end

  test "enforces unique slugs" do
    Category.create!(name: "Health", slug: "health")
    duplicate = Category.new(name: "Health 2", slug: "health")
    assert_not duplicate.valid?
    assert_includes duplicate.errors[:slug], "has already been taken"
  end
end
