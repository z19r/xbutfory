class EntryCardComponent < ViewComponent::Base
  def initialize(x:, y:, votes:, description:, submitter:, ago:, url: "#", slug: nil, index: nil, category: nil, category_label: nil, stamp: nil, sponsored: nil, voted: false)
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
  end

  def detail_path
    return "#" unless @slug
    helpers.entry_path(slug: @slug)
  end

  def pinned? = @sponsored == "pinned"
  def spotlight? = @sponsored == "spotlight"

  def card_classes
    classes = ["c-entry-card"]
    classes << "c-entry-card--pinned" if pinned?
    classes << "c-entry-card--spotlight" if spotlight?
    classes.join(" ")
  end

  def vote_classes
    classes = ["c-entry-card__vote-btn"]
    classes << "c-entry-card__vote-btn--voted" if @voted
    classes.join(" ")
  end
end
