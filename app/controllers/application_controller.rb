class ApplicationController < ActionController::Base
  include Authentication

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes

  # Every request is timed and counted, tagged by controller/action/status so
  # the Sentry dashboard has a per-endpoint latency + traffic picture.
  around_action :track_request_metrics

  private

  def track_request_metrics
    start = Process.clock_gettime(Process::CLOCK_MONOTONIC)
    yield
  ensure
    duration_ms =
      (Process.clock_gettime(Process::CLOCK_MONOTONIC) - start) * 1000
    tags = {
      controller: controller_name,
      action: action_name,
      status: response.status.to_s,
      format: request.format.symbol.to_s,
    }
    SentryMetrics.distribution(
      'request.duration',
      duration_ms,
      unit: 'millisecond',
      **tags,
    )
    SentryMetrics.count('request.completed', **tags)
  end

  # After Dark (NSFW listings) is a members-only view: the cookie is only
  # honored while signed in, so a forged cookie can't reveal NSFW to guests.
  # Members get it on by default — only an explicit '0' opts back out.
  def after_dark?
    current_user.present? && cookies[:after_dark] != '0'
  end
  helper_method :after_dark?
end
