# frozen_string_literal: true

require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  test 'a new product starts pending' do
    assert Product.create!(name: 'Notion').pending?
  end

  test 'approve transitions to approved and stamps approved_at' do
    product = Product.create!(name: 'Uber')
    assert_nil product.approved_at

    product.approve!

    assert product.approved?
    assert_not_nil product.approved_at
  end

  test 'reject transitions to rejected' do
    product = Product.create!(name: 'Figma')
    product.reject!
    assert product.rejected?
  end

  test 'for_name dedupes case-insensitively and can approve' do
    a = Product.for_name('Airbnb', url: 'https://airbnb.com', approved: true)
    b = Product.for_name('airbnb')

    assert_equal a, b
    assert_equal 1, Product.where('lower(name) = ?', 'airbnb').count
    assert a.approved?
  end

  test 'AASM exposes state scopes' do
    Product.create!(name: 'A').approve!
    Product.create!(name: 'B')

    assert_equal 1, Product.approved.count
    assert_equal 1, Product.pending.count
  end
end
