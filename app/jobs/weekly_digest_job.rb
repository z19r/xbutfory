class WeeklyDigestJob < ApplicationJob
  queue_as :default

  def perform
    WeeklyDigest.deliver_all
  end
end
