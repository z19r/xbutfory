require 'test_helper'

# Rack::Attack is disabled globally in test (see the initializer); these
# tests flip it on with a fresh store to prove the throttles bite.
class RateLimitingTest < ActionDispatch::IntegrationTest
  setup do
    Rack::Attack.enabled = true
    Rack::Attack.cache.store = ActiveSupport::Cache::MemoryStore.new
  end

  teardown { Rack::Attack.enabled = false }

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
