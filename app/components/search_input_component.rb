class SearchInputComponent < ViewComponent::Base
  def initialize(placeholder: "Search the index…", value: "")
    @placeholder = placeholder
    @value = value
  end
end
