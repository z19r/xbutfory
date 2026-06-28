class PagesController < ApplicationController
  def home
    @entries = Entry.latest.limit(20)
    @new_today = Entry.where(created_at: Date.current.all_day).count
    @total_entries = Entry.count
    @total_votes = Entry.sum(:votes_count)
  end
end
