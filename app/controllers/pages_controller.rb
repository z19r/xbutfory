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
  end
end
