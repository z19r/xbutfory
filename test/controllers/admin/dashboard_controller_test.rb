require 'test_helper'

class Admin::DashboardControllerTest < ActionDispatch::IntegrationTest
  test 'dashboard is 404 for anonymous visitors' do
    get admin_root_path
    assert_response :not_found
  end

  test 'dashboard is 404 for non-admin members' do
    sign_in_as(users(:member))
    get admin_root_path
    assert_response :not_found
  end

  test 'dashboard renders totals for admins' do
    sign_in_as(users(:editor))
    get admin_root_path
    assert_response :success
    assert_select '.l-manage__title', text: 'The desk'
    assert_select '.l-admin__stat', minimum: 6
  end
end
