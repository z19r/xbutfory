# frozen_string_literal: true

# Thin, crash-proof wrapper over Sentry's metrics API. Every call is guarded
# so a metrics hiccup (or a Sentry SDK that isn't initialized in dev/test) can
# never take down the request or job that emitted it.
#
# Naming: dot-separated <domain>.<what> (vote.cast, checkout.started). Tags are
# low-cardinality only — never entry ids, emails, or slugs. The SDK already
# attaches user + environment + release to every metric.
#
# Ported from markbin-dot-net; the z19r house convention is to carpet the app
# with these so every meaningful action shows up on the Sentry dashboard.
module SentryMetrics
  module_function

  # Unified counter for rescued (handled) errors — graph by exception_class and
  # the source that caught it. Handled errors don't reach Sentry as issues, so
  # this is how they stay visible.
  def record_rescue(exception, source:)
    count(
      'error.rescued',
      exception_class: exception.class.name,
      source: source,
    )
  end

  def count(key, value: 1, **tags)
    Sentry.metrics.count(key, value: value, attributes: tags)
  rescue StandardError => e
    Rails.logger.debug { "SentryMetrics.count failed: #{e.message}" }
  end

  def distribution(key, value, unit: nil, **tags)
    kwargs = { attributes: tags }
    kwargs[:unit] = unit if unit
    Sentry.metrics.distribution(key, value, **kwargs)
  rescue StandardError => e
    Rails.logger.debug { "SentryMetrics.distribution failed: #{e.message}" }
  end

  def gauge(key, value, unit: nil, **tags)
    kwargs = { attributes: tags }
    kwargs[:unit] = unit if unit
    Sentry.metrics.gauge(key, value, **kwargs)
  rescue StandardError => e
    Rails.logger.debug { "SentryMetrics.gauge failed: #{e.message}" }
  end

  # Times the block and emits it as a millisecond distribution, returning the
  # block's own value so it can wrap an expression transparently.
  def timing(key, unit: 'millisecond', **tags)
    start = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    result = yield
    elapsed =
      ((Process.clock_gettime(Process::CLOCK_MONOTONIC) - start) * 1000).round(2)
    distribution(key, elapsed, unit: unit, **tags)
    result
  end
end
