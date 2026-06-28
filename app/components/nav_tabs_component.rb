class NavTabsComponent < ViewComponent::Base
  Tab = Data.define(:label, :key, :path)

  def initialize(active: "latest")
    @active = active
    @tabs = [
      Tab.new(label: "Latest", key: "latest", path: "/"),
      Tab.new(label: "Trending", key: "trending", path: "/?sort=trending"),
      Tab.new(label: "Top Voted", key: "top", path: "/?sort=top"),
      Tab.new(label: "Categories", key: "categories", path: "/categories"),
      Tab.new(label: "Random", key: "random", path: "/?sort=random"),
      Tab.new(label: "Submit", key: "submit", path: "/submit")
    ]
  end
end
