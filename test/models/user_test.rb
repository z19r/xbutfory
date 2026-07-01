require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test 'valid fixture user' do
    assert users(:member).valid?
  end

  test 'requires a handle' do
    user = build_user(handle: nil)
    assert_not user.valid?
    assert_includes user.errors[:handle], "can't be blank"
  end

  test 'handle must match the format' do
    assert_not build_user(handle: 'No Spaces').valid?
    assert_not build_user(handle: 'ab').valid? # too short
    assert_not build_user(handle: 'a' * 21).valid? # too long
    assert build_user(handle: 'good_handle3').valid?
  end

  test 'handle is normalized to lowercase' do
    user = build_user(handle: 'MixedCase')
    user.validate
    assert_equal 'mixedcase', user.handle
  end

  test 'handle is unique case-insensitively' do
    build_user(handle: 'taken').save!
    dup = build_user(handle: 'TAKEN', email: 'other@example.com')
    assert_not dup.valid?
    assert_includes dup.errors[:handle], 'has already been taken'
  end

  test 'email is required and unique' do
    assert_not build_user(email: nil).valid?
    build_user(email: 'dup@example.com', handle: 'first').save!
    assert_not build_user(email: 'dup@example.com', handle: 'second').valid?
  end

  test 'authenticates with the right password' do
    user = build_user.tap(&:save!)
    assert user.authenticate('secret123')
    assert_not user.authenticate('wrong')
  end

  test 'api_key is auto-generated' do
    user = build_user(api_key: nil)
    user.validate
    assert user.api_key.present?
  end

  test 'legacy returns the placeholder user' do
    assert_equal users(:legacy), User.legacy
  end

  test 'to_param is the handle' do
    assert_equal 'member', users(:member).to_param
  end

  test 'find_by_login resolves email' do
    member = users(:member)
    assert_equal member, User.find_by_login(member.email)
    assert_equal member, User.find_by_login("  #{member.email.upcase}  ")
  end

  test 'find_by_login resolves @handle with or without @' do
    member = users(:member)
    assert_equal member, User.find_by_login('@member')
    assert_equal member, User.find_by_login('member')
  end

  test 'find_by_login returns nil for blank input' do
    assert_nil User.find_by_login('')
    assert_nil User.find_by_login('   ')
  end

  private

  def build_user(**overrides)
    User.new(
      {
        handle: 'newbie',
        display_name: 'New Bie',
        email: 'newbie@example.com',
        password: 'secret123',
        password_confirmation: 'secret123',
      }.merge(overrides),
    )
  end
end
