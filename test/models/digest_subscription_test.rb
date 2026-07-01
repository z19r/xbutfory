require 'test_helper'

class DigestSubscriptionTest < ActiveSupport::TestCase
  test 'normalizes and requires a well-formed email' do
    sub = DigestSubscription.create!(email: '  READER@Example.COM ')
    assert_equal 'reader@example.com', sub.email
  end

  test 'rejects a malformed email' do
    assert_not DigestSubscription.new(email: 'not-an-email').valid?
    assert_not DigestSubscription.new(email: '').valid?
  end

  test 'enforces case-insensitive uniqueness' do
    DigestSubscription.create!(email: 'dupe@example.com')
    assert_not DigestSubscription.new(email: 'DUPE@example.com').valid?
  end

  test 'round-trips an unsubscribe token' do
    sub = DigestSubscription.create!(email: 'token@example.com')
    token = sub.generate_token_for(:unsubscribe)
    assert_equal sub, DigestSubscription.find_by_token_for(:unsubscribe, token)
  end
end
