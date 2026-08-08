require 'test_helper'

# Rack::Attack is disabled globally in test (see the initializer); these
# tests flip it on with a fresh store to prove the throttles bite.
class RateLimitingTest < ActionDispatch::IntegrationTest
  setup do
    Rack::Attack.enabled = true
    Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new
    # Pin the clock: throttle counters live in per-period time buckets, so a
    # slow runner straddling a bucket boundary mid-loop resets the count and
    # the Nth request sails through. Frozen time keeps one bucket for all N.
    freeze_time
  end

  teardown do
    Rack::Attack.enabled = false
    unfreeze_time
  end

  test 'hammering sign-in from one IP gets throttled' do
    11.times do
      post sign_in_path,
           params: {
             login: 'nobody@example.com',
             password: 'wrong',
           }
    end
    assert_response :too_many_requests
  end

  test 'the AI pitch endpoint is throttled' do
    11.times { post pitch_path, params: { x: 'Uber', y: 'llamas' } }
    assert_response :too_many_requests
  end

  test 'normal browsing is not throttled' do
    5.times { get root_path }
    assert_response :success
  end
end
