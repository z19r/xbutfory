class User < ApplicationRecord
  has_secure_password

  has_many :entries, dependent: :restrict_with_exception
  has_many :votes, dependent: :destroy
  has_many :payments, dependent: :destroy

  has_one_attached :avatar

  AVATAR_MAX_BYTES = 2.megabytes
  AVATAR_TYPES = %w[image/png image/jpeg image/webp image/gif].freeze

  validate :avatar_is_a_reasonable_image

  # A square, cropped thumbnail for discs and bylines. Nil when there's nothing
  # uploaded (or the blob isn't an image we can transform) so callers fall back
  # to the initial disc instead of raising.
  def avatar_thumb
    return unless avatar.attached? && avatar.variable?

    avatar.variant(resize_to_fill: [96, 96])
  end

  # Single-use, 15-minute password-reset token — invalidated once the password changes
  # (the salt rotates). Rails 8 generates_token_for.
  generates_token_for :password_reset, expires_in: 15.minutes do
    password_salt&.last(10)
  end

  # Email-confirmation token (2 days); embeds the email so it's void if the address changes.
  generates_token_for :email_confirmation, expires_in: 2.days do
    email
  end

  def confirmed?
    confirmed_at.present?
  end

  def confirm!
    update_column(:confirmed_at, Time.current) unless confirmed?
  end

  # Public @handle: lowercase letters, digits, underscores; 3–20 chars; permanent.
  HANDLE_FORMAT = /\A[a-z0-9_]{3,20}\z/

  before_validation :normalize_handle, :normalize_email, :ensure_api_key

  validates :handle,
            presence: true,
            format: {
              with: HANDLE_FORMAT,
              message: "must be 3–20 lowercase letters, numbers or underscores"
            },
            uniqueness: {
              case_sensitive: false
            }
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :api_key, presence: true, uniqueness: true

  # The placeholder owner for migrated anonymous entries.
  def self.legacy
    find_by(handle: "legacy")
  end

  def to_param
    handle
  end

  private

  def normalize_handle
    self.handle = handle.to_s.strip.downcase.presence
  end

  def normalize_email
    self.email = email.to_s.strip.downcase.presence
  end

  def ensure_api_key
    self.api_key ||= SecureRandom.hex(24)
  end

  def avatar_is_a_reasonable_image
    return unless avatar.attached?

    unless avatar.blob.content_type.in?(AVATAR_TYPES)
      errors.add(:avatar, 'must be a PNG, JPEG, WebP or GIF')
    end

    if avatar.blob.byte_size > AVATAR_MAX_BYTES
      errors.add(:avatar, 'must be smaller than 2 MB')
    end
  end
end
