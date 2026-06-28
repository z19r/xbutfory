class EntriesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def show
    @entry = Entry.find_by!(slug: params[:slug])
    @category = Category.find_by(slug: @entry.category)
    @voted = @entry.votes.exists?(voter_ip: request.remote_ip)
  end

  private

  def not_found
    redirect_to root_path, notice: "That entry doesn't exist (or never did)."
  end
end
