class SearchInputComponent < ViewComponent::Base
  def initialize(placeholder: "Try “Tinder but for…”", value: "")
    @placeholder = placeholder
    @value = value
  end
end
