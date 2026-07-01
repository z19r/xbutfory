# A glossy 12-point amber "starburst" badge — the signature Y2K maximal flourish.
# Pure decoration; the caller positions it (absolute) over a wordmark or hero.
# Mirrors design_system/components/brand/BetaBurst.jsx.
class BetaBurstComponent < ViewComponent::Base
  def initialize(label: 'BETA', size: 78, rotate: 12)
    @label = label
    @size = size
    @rotate = rotate
  end

  # The wrapper carries the size/rotation; the label counter-rotates to stay upright.
  def wrapper_style
    "width: #{@size}px; height: #{@size}px; transform: rotate(#{@rotate}deg);"
  end

  def label_style
    "transform: rotate(#{(-@rotate - 7)}deg); font-size: #{(@size * 0.27).round(2)}px;"
  end
end
