class PagesController < ApplicationController
  # The spotlight sponsor is dropped into the feed after this many organic rows.
  SPOTLIGHT_AFTER = 2
  # Organic listings shown alongside the (up to two) paid placements.
  ORGANIC_LIMIT = 18

  def home
    @sort = params[:sort].presence || "newest"
    @query = params[:q].presence

    @after_dark = cookies[:after_dark] == "1"
    entries = @after_dark ? Entry.all : Entry.sfw
    entries = entries.search(@query) if @query

    @filter_category = Category.find_by(slug: params[:category]) if params[:category].present?
    entries = entries.by_category(@filter_category.slug) if @filter_category

    @entries = arrange_feed(entries)
    @new_today = Entry.where(created_at: Date.current.all_day).count
    @total_entries = Entry.count
    @total_votes = Entry.sum(:votes_count)
    @categories_count = Category.count
  end

  private

  # Place paid listings the way the design dictates: the pinned sponsor sits at
  # the very top, the spotlight sponsor lands mid-feed, and organic rows are
  # sorted/limited around them. Sponsors still respect the active search and
  # category filter, so a sponsor that doesn't match simply won't appear.
  def arrange_feed(scope)
    pinned = scope.where(sponsored: "pinned").first
    spotlight = scope.where(sponsored: "spotlight").first
    organic = sort_entries(scope.where(sponsored: nil)).limit(ORGANIC_LIMIT).to_a

    feed = []
    feed << pinned if pinned
    organic.each_with_index do |entry, i|
      feed << entry
      feed << spotlight if spotlight && i == SPOTLIGHT_AFTER - 1
    end
    feed << spotlight if spotlight && feed.exclude?(spotlight)
    feed
  end

  def sort_entries(scope)
    case @sort
    when "top", "trending" then scope.trending
    when "random" then scope.order("RANDOM()")
    else scope.latest
    end
  end
end
