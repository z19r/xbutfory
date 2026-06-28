class SortToggleComponent < ViewComponent::Base
  Option = Data.define(:label, :key)

  def initialize(options:, active: nil)
    @options = options
    @active = active || options.first&.key
  end
end
