# Weekly-digest email capture — a titled sidebar card with a pitch line, an inset
# email field and a Subscribe button. The button can be a light glossy "gel" surface
# for the maximal look. Mirrors design_system/components/discovery/DigestSignup.jsx.
class DigestSignupComponent < ViewComponent::Base
  def initialize(
    title: "WEEKLY DIGEST",
    pitch: "The 10 best new “X but for Y” sites, every Sunday. No spam, no tracking.",
    placeholder: "you@domain.com",
    cta: "Subscribe",
    gel: true
  )
    @title = title
    @pitch = pitch
    @placeholder = placeholder
    @cta = cta
    @gel = gel
  end
end
