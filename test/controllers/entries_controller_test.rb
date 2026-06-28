require "test_helper"

class EntriesControllerTest < ActionDispatch::IntegrationTest
  test "show renders entry detail" do
    entry = entries(:one)
    get entry_path(slug: entry.slug)
    assert_response :success
    assert_select ".l-detail__title"
  end
end
