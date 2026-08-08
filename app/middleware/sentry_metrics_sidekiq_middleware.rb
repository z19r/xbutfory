# frozen_string_literal: true

# Server-side Sidekiq middleware that carpets every job with metrics: a
# started/completed/failed counter and a duration distribution, tagged by job
# class and queue. One place instead of hand-instrumenting each perform.
class SentryMetricsSidekiqMiddleware
  include Sidekiq::ServerMiddleware

  def call(_job_instance, job_payload, queue)
    job_class = job_payload['class'].to_s
    tags = { job_class: job_class, queue: queue.to_s }

    SentryMetrics.count('job.started', **tags)
    start = Process.clock_gettime(Process::CLOCK_MONOTONIC)

    begin
      yield
      SentryMetrics.count('job.completed', **tags)
    rescue StandardError => e
      SentryMetrics.count(
        'job.failed',
        **tags,
        error: e.class.name,
      )
      raise
    ensure
      duration_ms =
        (Process.clock_gettime(Process::CLOCK_MONOTONIC) - start) * 1000
      SentryMetrics.distribution(
        'job.duration',
        duration_ms,
        unit: 'millisecond',
        **tags,
      )
    end
  end
end
