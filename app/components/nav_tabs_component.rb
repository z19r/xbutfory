class NavTabsComponent < ViewComponent::Base
  Tab = Data.define(:label, :key)

  TABS = [
    Tab.new(label: "Latest", key: "latest"),
    Tab.new(label: "Trending", key: "trending"),
    Tab.new(label: "Top Voted", key: "top"),
    Tab.new(label: "Categories", key: "categories"),
    Tab.new(label: "Random", key: "random"),
    Tab.new(label: "Submit", key: "submit")
  ].freeze

  def initialize(active: "latest", tabs: TABS)
    @active = active
    @tabs = tabs
  end
end
