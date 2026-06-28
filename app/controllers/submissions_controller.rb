class SubmissionsController < ApplicationController
  before_action :require_authentication
  before_action :load_categories

  def new
    @entry = Entry.new
  end

  def create
    @entry = current_user.entries.new(entry_params)
    @entry.submitter = current_user.handle # byline is the @handle (column dropped in Phase E)
    if @entry.save
      redirect_to entry_path(slug: @entry.slug), notice: submission_notice(@entry)
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @entry = own_entry
  end

  def update
    @entry = own_entry
    was_needs_edits = @entry.needs_edits?
    if @entry.update(entry_params)
      @entry.update(status: "pending") if was_needs_edits # "edit & resubmit"
      redirect_to manage_submissions_path, notice: "Listing updated."
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # Status transitions from the manage screen (withdraw / cancel / restore).
  TRANSITIONS = { "withdrawn" => %w[live pending needs_edits], "live" => %w[withdrawn] }.freeze

  def transition
    entry = own_entry
    target = params[:to]
    if TRANSITIONS[target]&.include?(entry.status)
      entry.update!(status: target)
      redirect_to manage_submissions_path, notice: transition_notice(target)
    else
      redirect_to manage_submissions_path, alert: "That status change isn't allowed."
    end
  end

  private

  def own_entry
    current_user.entries.find(params[:id])
  end

  def transition_notice(target)
    case target
    when "withdrawn" then "Listing withdrawn."
    when "live" then "Listing restored."
    else "Listing updated."
    end
  end

  def load_categories
    @categories = Category.order(:name)
  end

  def entry_params
    params.require(:entry).permit(:x, :y, :name, :description, :url, :category, :tier)
  end

  def submission_notice(entry)
    if entry.featured?
      "Submitted. 💳 Payment for the featured spot is coming soon — you're listed in the meantime."
    else
      "Submitted. The editors will take a look."
    end
  end
end
