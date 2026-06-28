class SubmissionsController < ApplicationController
  def new
    @entry = Entry.new
  end

  def create
    @entry = Entry.new(entry_params)
    if @entry.save
      redirect_to entry_path(slug: @entry.slug), notice: "Submitted. The editors will take a look."
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def entry_params
    params.require(:entry).permit(:x, :y, :description, :url, :submitter, :category)
  end
end
