require 'test_helper'

class DigestSubscriptionsControllerTest < ActionDispatch::IntegrationTest
  test 'subscribing a new email persists it' do
    assert_difference 'DigestSubscription.count', 1 do
      post digest_subscriptions_path, params: { email: 'new@example.com' }
    end
    assert_redirected_to root_path
  end

  test 'subscribing a known email is an idempotent success' do
    DigestSubscription.create!(email: 'known@example.com')
    assert_no_difference 'DigestSubscription.count' do
      post digest_subscriptions_path, params: { email: 'KNOWN@example.com' }
    end
    assert_redirected_to root_path
  end

  test 'a malformed email is rejected' do
    assert_no_difference 'DigestSubscription.count' do
      post digest_subscriptions_path, params: { email: 'nope' }
    end
    assert_redirected_to root_path
    assert_equal "That email didn't look right.", flash[:alert]
  end

  test 'a valid unsubscribe token removes the subscription' do
    sub = DigestSubscription.create!(email: 'leaving@example.com')
    token = sub.generate_token_for(:unsubscribe)
    assert_difference 'DigestSubscription.count', -1 do
      get digest_unsubscribe_path(token: token)
    end
    assert_response :success
  end

  test 'a garbage unsubscribe token removes nothing' do
    DigestSubscription.create!(email: 'staying@example.com')
    assert_no_difference 'DigestSubscription.count' do
      get digest_unsubscribe_path(token: 'garbage')
    end
    assert_response :success
  end
end
