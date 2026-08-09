# Full listing management: search, filter, pull, restore, feature, and the
# manual sponsor slots. Promotion here is editorial fiat — no payment required.
class Admin::EntriesController < Admin::BaseController
  STATUSES = %w[live pending needs_edits withdrawn].freeze
  PLACEMENTS = %w[pinned spotlight none].freeze

  def index
    @query = params[:q].presence
    @status = params[:status].presence_in(STATUSES)
    @tier = params[:tier].presence_in(Entry::TIERS)

    scope = Entry.includes(:user).order(created_at: :desc)
    scope = scope.search(@query) if @query
    scope = scope.where(status: @status) if @status
    scope = scope.where(tier: @tier) if @tier

    @entries = scope.limit(100)
    @counts = Entry.group(:status).count
  end

  # Pull a listing off the index (owner-visible as withdrawn, restorable).
  def pull
    entry = Entry.find(params[:id])
    entry.withdraw! if entry.may_withdraw?
    redirect_back_to_index notice: "Pulled — “#{entry.title}” is off the index."
  end

  def restore
    entry = Entry.find(params[:id])
    entry.restore! if entry.may_restore?
    redirect_back_to_index notice: "Restored — “#{entry.title}” is live again."
  end

  def feature
    entry = Entry.find(params[:id])
    entry.update!(tier: 'featured')
    redirect_back_to_index notice: "“#{entry.title}” is now Featured."
  end

  def unfeature
    entry = Entry.find(params[:id])
    entry.update!(tier: 'free')
    redirect_back_to_index notice: "“#{entry.title}” is back on the free tier."
  end

  # Hand a listing one of the two sponsor slots (pinned / spotlight) or clear
  # it. Each slot holds exactly one listing, so the incumbent is evicted first.
  def promote
    entry = Entry.find(params[:id])
    placement = params[:placement].presence_in(PLACEMENTS)
    unless placement
      redirect_back_to_index alert: 'Pick a real slot: pinned or spotlight.'
      return
    end

    if placement == 'none'
      entry.update!(sponsored: nil)
      notice = "“#{entry.title}” gives up its sponsor slot."
    else
      Entry.transaction do
        Entry
          .where(sponsored: placement)
          .where.not(id: entry.id)
          .update_all(sponsored: nil)
        entry.update!(sponsored: placement)
      end
      notice = "“#{entry.title}” now holds the #{placement} slot."
    end
    redirect_back_to_index notice: notice
  end

  private

  def redirect_back_to_index(**flash)
    redirect_back fallback_location: admin_entries_path, **flash
  end
end
