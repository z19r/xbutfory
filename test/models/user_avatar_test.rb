require 'test_helper'

class UserAvatarTest < ActiveSupport::TestCase
  def png
    {
      io: File.open(Rails.root.join('test/fixtures/files/avatar.png')),
      filename: 'avatar.png',
      content_type: 'image/png',
    }
  end

  test 'avatar_thumb is nil until something is uploaded' do
    assert_nil users(:member).avatar_thumb
  end

  test 'accepts a small image and exposes a square thumbnail' do
    user = users(:member)
    user.avatar.attach(png)
    assert user.valid?
    assert user.avatar_thumb.present?
  end

  test 'rejects a non-image upload' do
    user = users(:member)
    user.avatar.attach(
      io: StringIO.new('not an image'),
      filename: 'note.txt',
      content_type: 'text/plain',
    )
    assert_not user.valid?
    assert_includes user.errors[:avatar].join, 'PNG'
  end

  test 'rejects an oversized image' do
    user = users(:member)
    user.avatar.attach(png)
    user.avatar.blob.update_column(:byte_size, User::AVATAR_MAX_BYTES + 1)
    assert_not user.valid?
    assert_includes user.errors[:avatar].join, '2 MB'
  end
end
