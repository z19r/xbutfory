# Assembles the week's digest and fans it out to every recipient — standalone
# DigestSubscription subscribers plus confirmed members who kept digest_opt_in.
#
# Kept deliberately thin: it decides *what* goes out and *to whom*; the mailer
# owns rendering and Solid Queue owns delivery (deliver_later).
class WeeklyDigest
  # New, live listings from the last week make the cut — most-voted first.
  WINDOW = 1.week

  def self.deliver_all(now: Time.current)
    new.deliver_all(now: now)
  end

  def deliver_all(now: Time.current)
    entries = entries_since(now - WINDOW)
    return 0 if entries.empty?

    count = 0
    each_recipient do |email, token|
      DigestMailer.weekly(email: email, entries: entries, unsubscribe_token: token).deliver_later
      count += 1
    end
    count
  end

  def entries_since(cutoff)
    Entry.live.sfw.where('created_at >= ?', cutoff).trending.limit(12).to_a
  end

  private

  # Yields [email, unsubscribe_token]. Members unsubscribe from account settings,
  # so they carry no token; standalone subscribers get a tokenized link.
  def each_recipient
    DigestSubscription.find_each do |sub|
      yield sub.email, sub.generate_token_for(:unsubscribe)
    end

    User.where(digest_opt_in: true).where.not(confirmed_at: nil).find_each do |user|
      yield user.email, nil
    end
  end
end
