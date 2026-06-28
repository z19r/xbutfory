class PagesController < ApplicationController
  def home
    @sort = params[:sort].presence || "newest"
    @query = params[:q].presence
    @after_dark = cookies[:after_dark] == "1"
    @filter_category = Category.find_by(slug: params[:category]) if params[:category].present?

    base = @after_dark ? Entry.all : Entry.sfw
    @entries = FeedQuery.new(scope: base, sort: @sort, query: @query, category: @filter_category).entries

    @new_today = Entry.where(created_at: Date.current.all_day).count
    @total_entries = Entry.count
    @total_votes = Entry.sum(:votes_count)
    @categories_count = Category.count
    @tag_cloud = tag_cloud(include_nsfw: @after_dark)
  end

  private

  # The sidebar tag cloud: one tag per category, weighted 1–5 by entry count and
  # linking to that category's feed filter.
  def tag_cloud(include_nsfw:)
    stats = Category.with_stats(include_nsfw: include_nsfw)
    max = stats.map { |s| s[:count] }.max.to_i

    stats.map do |s|
      weight = max.zero? ? 3 : (1 + (s[:count] * 4.0 / max)).round.clamp(1, 5)
      { label: s[:category].name.downcase, weight: weight, href: root_path(category: s[:category].slug) }
    end
  end
end
