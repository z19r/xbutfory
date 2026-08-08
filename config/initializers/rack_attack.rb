# frozen_string_literal: true

# Request throttling. Targeted ceilings on the endpoints worth abusing —
# credential stuffing, submit spam, vote rigging, and the AI pitch endpoint
# (which costs actual money per call). Limits are generous for humans and
# hostile to scripts.
class Rack::Attack
  # Redis in production (already there for Sidekiq); in-memory elsewhere.
  # The default solid_cache store would work but puts throttle bookkeeping
  # on Postgres for no reason.
  cache.store =
    if Rails.env.production?
      ActiveSupport::Cache::RedisCacheStore.new(
        url: ENV.fetch('REDIS_URL', 'redis://localhost:6379/0'),
      )
    else
      ActiveSupport::Cache::MemoryStore.new
    end

  # Credential stuffing: per-IP and per-target-account.
  throttle('sign_in/ip', limit: 10, period: 1.minute) do |req|
    req.ip if req.post? && req.path == '/sign_in'
  end

  throttle('sign_in/login', limit: 10, period: 1.minute) do |req|
    if req.post? && req.path == '/sign_in'
      req.params['login'].to_s.downcase.presence
    end
  end

  throttle('sign_up/ip', limit: 10, period: 1.hour) do |req|
    req.ip if req.post? && req.path == '/sign_up'
  end

  throttle('password_reset/ip', limit: 5, period: 1.hour) do |req|
    req.ip if req.post? && req.path == '/password/reset'
  end

  # Costs money per call — tightest ceiling on the board.
  throttle('pitch/ip', limit: 10, period: 1.hour) do |req|
    req.ip if req.post? && req.path == '/pitch'
  end

  throttle('submissions/ip', limit: 20, period: 1.hour) do |req|
    req.ip if req.post? && req.path == '/submissions'
  end

  throttle('votes/ip', limit: 60, period: 1.minute) do |req|
    req.ip if req.post? && req.path.match?(%r{\A/entries/\d+/vote\z})
  end

  throttle('digest/ip', limit: 5, period: 1.hour) do |req|
    req.ip if req.post? && req.path == '/digest'
  end
end

# Tests opt in per-case with a fresh MemoryStore (see
# test/integration/rate_limiting_test.rb).
Rack::Attack.enabled = false if Rails.env.test?
