require 'bcrypt'

# Submissions are now account-bound. Existing anonymous entries have no owner, so
# (per the locked migration decision) we assign them to a single placeholder
# "legacy" user — option (a) in MIGRATION.md. They are not dropped.
class AddUserAndStatusToEntries < ActiveRecord::Migration[8.1]
  def up
    add_reference :entries, :user, foreign_key: true # nullable during backfill
    add_column :entries, :status, :string, null: false, default: 'live'
    add_column :entries, :reviewer_note, :text

    legacy_id = ensure_legacy_user
    execute("UPDATE entries SET user_id = #{legacy_id} WHERE user_id IS NULL")

    change_column_null :entries, :user_id, false
  end

  def down
    remove_reference :entries, :user, foreign_key: true
    remove_column :entries, :status
    remove_column :entries, :reviewer_note
  end

  private

  # Create the placeholder owner if absent and return its id. Raw SQL keeps the
  # migration independent of the User model's validations.
  def ensure_legacy_user
    existing = select_value("SELECT id FROM users WHERE handle = 'legacy'")
    return existing if existing

    digest = BCrypt::Password.create(SecureRandom.hex(24))
    api_key = SecureRandom.hex(24)
    execute(
      ActiveRecord::Base.sanitize_sql_array(
        [
          'INSERT INTO users (handle, display_name, email, password_digest, api_key, ' \
            'digest_opt_in, reply_notifications, milestone_notifications, created_at, updated_at) ' \
            'VALUES (?, ?, ?, ?, ?, false, false, false, now(), now())',
          'legacy',
          'The Archive',
          'legacy@xbutfory.example',
          digest,
          api_key,
        ],
      ),
    )
    select_value("SELECT id FROM users WHERE handle = 'legacy'")
  end
end
