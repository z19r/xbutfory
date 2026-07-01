# Builds the home feed: applies search + category filters, then weaves the paid
# placements through the organic results the way the design dictates — the pinned
# sponsor at the very top, the spotlight sponsor mid-feed. Kept out of the
# controller so the placement rules live in one tested place.
class FeedQuery
  # The spotlight sponsor is dropped in after this many organic rows.
  SPOTLIGHT_AFTER = 2
  # Organic listings shown alongside the (up to two) paid placements.
  ORGANIC_LIMIT = 18

  def initialize(scope: Entry.all, sort: nil, query: nil, category: nil)
    @scope = scope
    @sort = sort
    @query = query
    @category = category
  end

  # The arranged feed as an ordered array of entries.
  def entries
    scoped = @scope
    scoped = scoped.search(@query) if @query.present?
    scoped = scoped.by_category(@category.slug) if @category
    arrange(scoped)
  end

  private

  def arrange(scope)
    scope = scope.includes(:user) # byline reads user.handle — avoid N+1
    pinned = scope.where(sponsored: 'pinned').first
    spotlight = scope.where(sponsored: 'spotlight').first
    organic = sort(scope.where(sponsored: nil)).limit(ORGANIC_LIMIT).to_a

    feed = []
    feed << pinned if pinned
    organic.each_with_index do |entry, i|
      feed << entry
      feed << spotlight if spotlight && i == SPOTLIGHT_AFTER - 1
    end
    feed << spotlight if spotlight && feed.exclude?(spotlight)
    feed
  end

  def sort(scope)
    case @sort
    when 'top', 'trending'
      scope.trending
    when 'random'
      scope.order('RANDOM()')
    else
      scope.latest
    end
  end
end
