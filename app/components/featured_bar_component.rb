# The full-bleed "AS FEATURED ON" social-proof strip — a sunken band of glossy gel
# badges, capped on the right with a retro validity stamp. A signature blogosphere
# flourish. Mirrors design_system/components/discovery/FeaturedBar.jsx.
class FeaturedBarComponent < ViewComponent::Base
  def initialize(
    label: "AS FEATURED ON",
    badges: ["Digg", "del.icio.us", "MetaFilter", "Daring Fireball"],
    note: "valid XHTML 1.0 · RSS 2.0",
    gel: true
  )
    @label = label
    @badges = badges
    @note = note
    @gel = gel
  end
end
