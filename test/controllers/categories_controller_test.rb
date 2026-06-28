require "test_helper"

class CategoriesControllerTest < ActionDispatch::IntegrationTest
  test "categories index loads" do
    get categories_path
    assert_response :success
    assert_select ".l-categories__heading"
  end

  test "filtered category shows entries" do
    get categories_path(category: "consumer")
    assert_response :success
  end
end
