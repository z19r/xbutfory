# frozen_string_literal: true

# Z19R convention (see markbin-dot-net): REDIS_SIDEKIQ_URL is this
# project's queue instance; REDIS_URL is the shared cache Redis and must
# not carry Sidekiq state. Dev/test fall through to localhost.
redis_url =
  ENV.fetch('REDIS_SIDEKIQ_URL', ENV.fetch('REDIS_URL', 'redis://localhost:6379/0'))

Sidekiq.configure_server do |config|
  config.redis = { url: redis_url }

  # Load recurring jobs (weekly digest, etc.) from config/schedule.yml.
  schedule_file = Rails.root.join('config/schedule.yml')
  if File.exist?(schedule_file)
    require 'sidekiq/cron/job'
    Sidekiq::Cron::Job.load_from_hash!(YAML.load_file(schedule_file))
  end
end

Sidekiq.configure_client do |config|
  config.redis = { url: redis_url }
end

# Carpet every job with Sentry metrics (start/complete/fail + duration).
#
# This has to wait for to_prepare: initializers load before Rails sets up the
# main Zeitwerk autoloader, so naming an app/ constant here raises
# NameError. to_prepare runs after that and before Sidekiq starts polling.
# Chain#add replaces an existing entry, so a dev reload can't double-register.
Rails.application.config.to_prepare do
  Sidekiq.configure_server do |config|
    config.server_middleware do |chain|
      chain.add SentryMetricsSidekiqMiddleware
    end
  end
end
