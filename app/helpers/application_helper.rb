module ApplicationHelper
  # Umami analytics only load in production, and never for an admin/editor — so
  # our own browsing doesn't pollute the funnel. A missing website id disables
  # it everywhere. Mirrors the z19r convention (see markbin-dot-net).
  def umami_enabled?
    ENV['UMAMI_WEBSITE_ID'].present? && Rails.env.production? &&
      !current_user&.admin?
  end

  STARTUPBAR_ID = '963f2aea-864e-4130-a5bb-7565ae1820d1'.freeze

  # The StartupBar widget is a third-party embed, so it stays out of dev and
  # test by default — no external fetch on every system test run. Set
  # STARTUPBAR_PREVIEW=1 to check the 36px offset locally.
  def startupbar_enabled?
    Rails.env.production? || ENV['STARTUPBAR_PREVIEW'].present?
  end
end
