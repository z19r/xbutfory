require 'test_helper'

class AccountMenuComponentAvatarTest < ViewComponent::TestCase
  test 'falls back to the handle initial when there is no avatar' do
    render_inline(AccountMenuComponent.new(handle: 'apt_4b'))
    assert_selector '.c-account-menu__avatar', text: 'A'
    assert_no_selector '.c-account-menu__avatar-img'
  end

  test 'renders the avatar image when a thumbnail is supplied' do
    user = users(:member)
    user.avatar.attach(
      io: File.open(Rails.root.join('test/fixtures/files/avatar.png')),
      filename: 'avatar.png',
      content_type: 'image/png',
    )
    render_inline(
      AccountMenuComponent.new(
        handle: user.handle,
        avatar_thumb: user.avatar_thumb,
      ),
    )
    assert_selector 'img.c-account-menu__avatar-img'
  end
end
