# Cron entry point (config/schedule.yml). Fans the week's digest out to every
# recipient as one DigestEmailJob apiece so a single bad address can't stall
# or re-send the whole batch on retry.
class WeeklyDigestJob
  include Sidekiq::Job
  sidekiq_options queue: :default

  def perform
    WeeklyDigest.deliver_all
  end
end
