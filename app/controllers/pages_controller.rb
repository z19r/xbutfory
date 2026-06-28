class PagesController < ApplicationController
  def home
    @sort = params[:sort].presence || "newest"
    @query = params[:q].presence

    @after_dark = cookies[:after_dark] == "1"
    entries = @after_dark ? Entry.all : Entry.sfw
    entries = entries.search(@query) if @query

    @filter_category = Category.find_by(slug: params[:category]) if params[:category].present?
    entries = entries.by_category(@filter_category.slug) if @filter_category

    entries = sort_entries(entries)

    @entries = entries.limit(20)
    @new_today = Entry.where(created_at: Date.current.all_day).count
    @total_entries = Entry.count
    @total_votes = Entry.sum(:votes_count)
    @categories_count = Category.count
  end

  private

  def sort_entries(scope)
    case @sort
    when "top", "trending" then scope.trending
    when "random" then scope.order("RANDOM()")
    else scope.latest
    end
  end
end
