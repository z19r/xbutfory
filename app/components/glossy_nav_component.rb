# Maximal-mode primary navigation — a glossy periwinkle gel bar with a raised,
# inset-lit active tab. The loud counterpart to NavTabsComponent (hairline
# underline), used on the maximal home / marketing surfaces.
# Mirrors design_system/components/navigation/GlossyNav.jsx.
class GlossyNavComponent < ViewComponent::Base
  Tab = Data.define(:label, :key, :path)

  def initialize(active: 'latest', note: nil)
    @active = active
    @note = note
    @tabs = [
      Tab.new(label: 'Latest', key: 'latest', path: '/'),
      Tab.new(label: 'Trending', key: 'trending', path: '/?sort=trending'),
      Tab.new(label: 'Top Voted', key: 'top', path: '/?sort=top'),
      Tab.new(label: 'Categories', key: 'categories', path: '/categories'),
      Tab.new(label: 'Random', key: 'random', path: '/?sort=random'),
      Tab.new(label: 'Submit', key: 'submit', path: '/submit'),
    ]
  end
end
