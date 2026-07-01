class CategoriesController < ApplicationController
  def index
    @listings = Category.with_stats(include_nsfw: after_dark?)
  end
end
