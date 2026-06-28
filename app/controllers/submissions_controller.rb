class SubmissionsController < ApplicationController
  before_action :load_categories

  def new
    @entry = Entry.new
  end

  def create
    @entry = Entry.new(entry_params)
    if @entry.save
      redirect_to entry_path(slug: @entry.slug), notice: submission_notice(@entry)
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def load_categories
    @categories = Category.order(:name)
  end

  def entry_params
    params.require(:entry).permit(:x, :y, :name, :description, :url, :submitter, :category, :tier)
  end

  def submission_notice(entry)
    if entry.featured?
      "Submitted. 💳 Payment for the featured spot is coming soon — you're listed in the meantime."
    else
      "Submitted. The editors will take a look."
    end
  end
end
