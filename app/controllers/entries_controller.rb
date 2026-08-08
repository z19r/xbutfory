class EntriesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def show
    @entry = Entry.find_by!(slug: params[:slug])
    @category = Category.find_by(slug: @entry.category)
    @voted = user_signed_in? && @entry.votes.exists?(user: current_user)
    SentryMetrics.count(
      'entry.viewed',
      tier: @entry.tier,
      category: @entry.category.to_s.presence || 'none',
    )
  end

  private

  def not_found
    SentryMetrics.count('entry.not_found')
    redirect_to root_path, notice: "That entry doesn't exist (or never did)."
  end
end
