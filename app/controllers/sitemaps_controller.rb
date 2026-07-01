# XML sitemap of the public surface: the home feed, the category index, and
# every live (SFW) listing. Cached lightly since it changes at most daily.
class SitemapsController < ApplicationController
  def show
    @entries = Entry.live.sfw.latest
    expires_in 1.hour, public: true
  end
end
