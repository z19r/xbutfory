require 'test_helper'

class Admin::EntriesControllerTest < ActionDispatch::IntegrationTest
  test 'listings index is 404 for anonymous visitors' do
    get admin_entries_path
    assert_response :not_found
  end

  test 'listings index is 404 for non-admin members' do
    sign_in_as(users(:member))
    get admin_entries_path
    assert_response :not_found
  end

  test 'listings index renders and filters by status' do
    users(:member).entries.create!(x: 'Uber', y: 'goats', status: 'pending')
    sign_in_as(users(:editor))
    get admin_entries_path(status: 'pending')
    assert_response :success
    assert_select '.c-sub', 1
  end

  test 'listings index searches by formula' do
    users(:member).entries.create!(x: 'Zillow', y: 'treehouses')
    sign_in_as(users(:editor))
    get admin_entries_path(q: 'treehouses')
    assert_response :success
    assert_select '.c-sub', 1
  end

  test 'pull withdraws a live listing' do
    entry = users(:member).entries.create!(x: 'Uber', y: 'goats')
    sign_in_as(users(:editor))
    patch pull_admin_entry_path(entry.id)
    assert entry.reload.withdrawn?
  end

  test 'restore brings a withdrawn listing back' do
    entry =
      users(:member).entries.create!(x: 'Uber', y: 'goats', status: 'withdrawn')
    sign_in_as(users(:editor))
    patch restore_admin_entry_path(entry.id)
    assert entry.reload.live?
  end

  test 'feature and unfeature flip the tier' do
    entry = users(:member).entries.create!(x: 'Uber', y: 'goats')
    sign_in_as(users(:editor))
    patch feature_admin_entry_path(entry.id)
    assert_equal 'featured', entry.reload.tier
    patch unfeature_admin_entry_path(entry.id)
    assert_equal 'free', entry.reload.tier
  end

  test 'promote hands the pinned slot to one listing at a time' do
    incumbent =
      users(:member).entries.create!(
        x: 'Old',
        y: 'sponsor',
        sponsored: 'pinned',
      )
    entry = users(:member).entries.create!(x: 'Uber', y: 'goats')
    sign_in_as(users(:editor))
    patch promote_admin_entry_path(entry.id, placement: 'pinned')
    assert_equal 'pinned', entry.reload.sponsored
    assert_nil incumbent.reload.sponsored
  end

  test 'promote with placement none clears the slot' do
    entry =
      users(:member).entries.create!(
        x: 'Uber',
        y: 'goats',
        sponsored: 'spotlight',
      )
    sign_in_as(users(:editor))
    patch promote_admin_entry_path(entry.id, placement: 'none')
    assert_nil entry.reload.sponsored
  end

  test 'promote rejects made-up placements' do
    entry = users(:member).entries.create!(x: 'Uber', y: 'goats')
    sign_in_as(users(:editor))
    patch promote_admin_entry_path(entry.id, placement: 'blimp')
    assert_nil entry.reload.sponsored
  end

  test 'non-admins cannot pull listings' do
    entry = users(:member).entries.create!(x: 'Uber', y: 'goats')
    sign_in_as(users(:member))
    patch pull_admin_entry_path(entry.id)
    assert_response :not_found
    assert entry.reload.live?
  end
end
