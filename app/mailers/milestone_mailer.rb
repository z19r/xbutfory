class MilestoneMailer < ApplicationMailer
  def reached(user:, entry:, milestone:)
    @user = user
    @entry = entry
    @milestone = milestone

    mail to: user.email, subject: "#{entry.title} just cleared #{milestone} votes"
  end
end
