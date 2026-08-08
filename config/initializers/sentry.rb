# frozen_string_literal: true

# Error tracking. Dormant unless a DSN is configured — in practice that's
# production only; dev and test stay silent (see test/initializers).
#
# The release is read straight from `.current_version` (not CurrentVersion —
# autoloaded constants are off-limits in initializers under Zeitwerk), so a
# Sentry report maps back to the masthead's vol/issue line.
dsn = Rails.application.credentials.dig(:sentry, :dsn) || ENV['SENTRY_DSN']

if dsn.present?
  version_file = Rails.root.join('.current_version')

  Sentry.init do |config|
    config.dsn = dsn
    config.environment = Rails.env
    config.release = File.read(version_file).strip if File.exist?(
      version_file,
    )
    config.breadcrumbs_logger = %i[active_support_logger http_logger]
    # No PII — member emails/IPs stay out of events.
    config.send_default_pii = false
    # Light performance sampling; errors are the point, traces are gravy.
    config.traces_sample_rate = 0.1
  end
end
