class Admin::SubmissionsController < ApplicationController
  before_action :require_admin

  STATUSES = %w[pending needs_edits live withdrawn].freeze

  def index
    @filter = STATUSES.include?(params[:status]) ? params[:status] : "pending"
    @counts = STATUSES.index_with { |s| Entry.where(status: s).count }
    @entries = Entry.where(status: @filter).includes(:user).order(created_at: :desc)
  end

  def approve
    entry = Entry.find(params[:id])
    entry.update!(status: "live", reviewer_note: nil)
    redirect_to admin_submissions_path, notice: "Approved — “#{entry.title}” is live."
  end

  def request_changes
    entry = Entry.find(params[:id])
    entry.update!(status: "needs_edits", reviewer_note: params[:reviewer_note].to_s.strip.presence)
    redirect_to admin_submissions_path, notice: "Sent “#{entry.title}” back for edits."
  end
end
