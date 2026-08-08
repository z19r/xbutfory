# One-time: seed a house "promoted post" — a pinned sponsor entry advertising
# xbutfory.com on its own directory. Owned by a dedicated @xbutfory house
# account. Deadpan on purpose; the site buying its own top slot is the bit.
#
# Callback-free local classes + insert-style writes so app validations and the
# MilestoneNotifier don't fire; DB constraints (NOT NULL, unique slug/handle/
# api_key) still hold.
class CreateHousePromotedAd < ActiveRecord::Migration[8.1]
  class AdUser < ActiveRecord::Base
    self.table_name = "users"
  end

  class AdEntry < ActiveRecord::Base
    self.table_name = "entries"
  end

  HANDLE = "xbutfory"
  SLUG = "product-hunt-but-for-x-but-for-y-sites"

  def up
    now = Time.current
    house = AdUser.find_or_initialize_by(handle: HANDLE)
    if house.new_record?
      house.assign_attributes(
        display_name: "XbutforY",
        email: "hello@xbutfory.com",
        password_digest: BCrypt::Password.create(SecureRandom.hex(16)),
        api_key: SecureRandom.hex(24),
        state: "confirmed",
        confirmed_at: now,
        created_at: now,
        updated_at: now,
      )
      house.save!(validate: false)
    end

    return if AdEntry.exists?(slug: SLUG)

    AdEntry.create!(
      user_id: house.id,
      x: "Product Hunt",
      y: "X-but-for-Y sites",
      slug: SLUG,
      name: "XbutforY",
      url: "https://xbutfory.com",
      category: "discovery",
      tagline: "Every 'X but for Y', indexed. Including this one.",
      description:
        "A hand-curated, human-voted, daily index of newly launched " \
        "'X but for Y' sites. Yes, we bought the top slot on our own " \
        "directory. The bit commits to itself.",
      why:
        "Every genre eventually needs an index. We built the one for this " \
        "genre, then pinned ourselves to the top of it — because someone " \
        "was going to.",
      sponsored: "pinned",
      tier: "featured",
      status: "live",
      votes_count: 0,
      created_at: now,
      updated_at: now,
    )
  end

  def down
    AdEntry.where(slug: SLUG).delete_all
    AdUser.where(handle: HANDLE).delete_all
  end
end
