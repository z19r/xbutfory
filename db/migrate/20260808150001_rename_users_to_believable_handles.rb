# One-time cleanup: the seeded members shipped with cutesy, obviously-fake
# handles (@altar_ego, @squeezed_ceo, @floor_four). Replace every handle with
# a plausible, common-ish username built from real first/last names.
#
# Uses a callback-free local class + update_columns so the app's handle
# validations don't fight the bulk rewrite; the DB's unique index on
# lower(handle) still guards against collisions.
class RenameUsersToBelievableHandles < ActiveRecord::Migration[8.1]
  class RenameUser < ActiveRecord::Base
    self.table_name = "users"
  end

  FIRST = %w[
    james john robert michael david william richard joseph thomas chris dan
    mark paul steve greg kevin brian jason eric adam ryan nick tyler sean matt
    scott josh andrew justin brandon ben aaron jacob nathan zach mary jennifer
    linda patricia susan jessica sarah karen nancy lisa emily amanda megan laura
    ashley rachel hannah olivia grace claire chloe alex sam jordan taylor casey
    jamie morgan riley
  ].freeze

  LAST = %w[
    smith johnson williams brown jones garcia miller davis martinez lopez wilson
    anderson thomas taylor moore jackson martin lee perez thompson white harris
    clark lewis robinson walker young allen king wright hill scott green adams
    baker nelson carter mitchell roberts turner phillips campbell parker evans
    edwards collins stewart morris murphy cook rogers morgan bell bailey reed
    cooper richardson cox ward
  ].freeze

  def up
    used = RenameUser.pluck(:handle).map { |h| h.to_s.downcase }.to_set

    RenameUser.order(:id).each do |user|
      handle = unique_handle(used)
      used << handle
      user.update_columns(handle: handle)
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end

  private

  # Build candidate handles until we land one that fits the format and isn't
  # taken (by an original handle or one we've already assigned).
  def unique_handle(used)
    loop do
      candidate = build_handle
      valid = candidate.match?(/\A[a-z0-9_]{3,20}\z/)
      return candidate if valid && !used.include?(candidate)
    end
  end

  def build_handle
    first = FIRST.sample
    last = LAST.sample
    case rand(6)
    when 0 then "#{first}#{last[0]}"
    when 1 then "#{first[0]}#{last}"
    when 2 then "#{first}_#{last}"
    when 3 then "#{first}#{rand(2..99)}"
    when 4 then "#{first}_#{last[0]}"
    else "#{first}#{last}"
    end
  end
end
