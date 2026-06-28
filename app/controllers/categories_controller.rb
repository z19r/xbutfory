class CategoriesController < ApplicationController
  def index
    @listings = Category.with_stats(include_nsfw: cookies[:after_dark] == "1")
  end
end
