class FeedsController < ApplicationController
  FEED_LIMIT = 50

  # The real /feed.xml the RSS button has always promised: an Atom feed of the
  # latest safe-for-work entries.
  def show
    @entries = Entry.sfw.latest.limit(FEED_LIMIT)
    render formats: [:atom]
  end
end
