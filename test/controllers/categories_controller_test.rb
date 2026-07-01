require 'test_helper'

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  test 'categories index shows the heading and a tile grid' do
    get categories_path
    assert_response :success
    assert_select '.l-categories__heading .l-categories__title',
                  text: 'Browse by Category'
    assert_select '.l-categories__grid .c-category-tile', minimum: 1
  end

  test 'tiles link to the home feed filtered by category' do
    get categories_path
    assert_select 'a.c-category-tile[href=?]', root_path(category: 'saas')
  end
end
