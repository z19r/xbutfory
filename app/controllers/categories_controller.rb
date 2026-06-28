class CategoriesController < ApplicationController
  def index
    @categories = Category.order(:name)
    if params[:category].present?
      @filtered_category = Category.find_by(slug: params[:category])
      @entries = Entry.by_category(params[:category]).latest.limit(20)
    end
  end
end
