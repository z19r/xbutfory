class EntryCardComponent < ViewComponent::Base
  def initialize(
    x:,
    y:,
    votes:,
    description:,
    submitter:,
    ago:,
    url: "#",
    slug: nil,
    index: nil,
    category: nil,
    category_label: nil,
    stamp: nil,
    sponsored: nil,
    voted: false,
    entry_id: nil
  )
    @x = x
    @y = y
    @votes = votes
    @description = description
    @submitter = submitter
    @ago = ago
    @url = url
    @slug = slug
    @index = index
    @category = category
    @category_label = category_label
    @stamp = stamp
    @sponsored = sponsored
    @voted = voted
    @entry_id = entry_id
  end

  def detail_path
    return "#" unless @slug
    helpers.entry_path(slug: @slug)
  end

  def pinned? = @sponsored == "pinned"
  def spotlight? = @sponsored == "spotlight"

  def card_classes
    base = "c-card"
    base += " c-card--pinned" if pinned?
    base += " c-card--spotlight" if spotlight?
    base
  end

  def vote_classes
    base = "c-card__vote"
    base += " c-card__vote--on" if @voted
    base
  end
end
