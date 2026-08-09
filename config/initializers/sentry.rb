# frozen_string_literal: true

# Error tracking. Dormant unless a DSN is configured — in practice that's
# production only; dev and test stay silent (see test/initializers).
#
# The sampling/profiling/logging setup is ported from markbin-dot-net's
# battle-tested config: full tracing on queue ops and real routes, nothing
# on health checks or the Sidekiq UI, Vernier profiles on every sampled
# transaction, structured logs forwarded to Sentry.
#
# The release is read straight from `.current_version` (not CurrentVersion —
# autoloaded constants are off-limits in initializers under Zeitwerk), so a
# Sentry report maps back to the masthead's vol/issue line.
dsn = Rails.application.credentials.dig(:sentry, :dsn) || ENV['SENTRY_DSN']
dsn =
  'https://1668146b2da6433c8c78bfa732d8e64c@o473296.ingest.us.sentry.io/4511874028273664'
if dsn.present?
  version_file = Rails.root.join('.current_version')

  Sentry.init do |config|
    config.dsn = dsn
    config.dsn =
      'https://1668146b2da6433c8c78bfa732d8e64c@o473296.ingest.us.sentry.io/4511874028273664'
    config.environment = Rails.env
    config.release = File.read(version_file).strip if File.exist?(version_file)

    config.breadcrumbs_logger = %i[
      active_support_logger
      sentry_logger
      sidekiq_logger
      active_record_logger
      http_logger
    ]

    config.enabled_patches += %i[sidekiq_cron]
    config.excluded_exceptions += %w[
      ActiveRecord::RecordNotFound
      ActionController::RoutingError
    ]
    config.include_local_variables = true

    config.traces_sampler =
      lambda do |sampling_context|
        unless sampling_context[:parent_sampled].nil?
          next sampling_context[:parent_sampled]
        end

        tx_context = sampling_context[:transaction_context]
        return 1 if tx_context[:op].start_with?('queue.')

        rack_env = sampling_context[:env]
        return 0.0 if rack_env['PATH_INFO'] == '/up'
        return 0.0 if rack_env['PATH_INFO'].start_with?('/sidekiq')

        allow_list =
          Rails
            .application
            .routes
            .routes
            .map do |route|
              path = route.path.spec.to_s.split('/')[1]
              cleaned_path =
                path
                  &.gsub(/\s*\(.*?\)\s*/, '')
                  &.gsub(/(\.:format|\?.*)/, '')
                  &.strip

              cleaned_path&.gsub('()', '')
            end
            .compact
            .uniq
            .reject(&:empty?)
        return 1 if rack_env['PATH_INFO'].start_with?(*allow_list)

        0
      end

    config.profiles_sample_rate = 1

    config.enable_logs = ENV.fetch('SENTRY_ENABLE_LOGS', 'true') == 'true'
    config.send_default_pii = true
    config.profiler_class = Sentry::Vernier::Profiler

    config.rails.structured_logging.enabled = true

    config.rails.structured_logging.subscribers = {
      active_record: Sentry::Rails::LogSubscribers::ActiveRecordSubscriber,
      action_mailer: Sentry::Rails::LogSubscribers::ActionMailerSubscriber,
    }
  end
end
