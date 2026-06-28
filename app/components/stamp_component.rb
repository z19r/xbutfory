class StampComponent < ViewComponent::Base
  VARIANTS = %w[new sponsored featured].freeze

  def initialize(variant: "new", label: nil)
    @variant = variant
    @label = label || variant.upcase
  end
end
