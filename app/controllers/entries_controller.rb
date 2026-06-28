class EntriesController < ApplicationController
  def show
    @entry = Entry.find_by!(slug: params[:slug])
  end
end
