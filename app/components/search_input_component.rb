class SearchInputComponent < ViewComponent::Base
  # Deadpan rotating prompts, every one obeying the sacred "X but for Y" formula.
  PHRASES = [
    'Try “Tinder but for…”',
    'Try “Notion but for recipes”',
    'Try “Uber but for horses”',
    'Try “Stripe but for lemonade stands”',
    'Try “Kayak but for restaurant tables”',
    'Try “Linear but for wedding planning”',
  ].freeze

  def initialize(placeholder: PHRASES.first, value: '', phrases: PHRASES)
    @placeholder = placeholder
    @value = value
    @phrases = phrases
  end

  attr_reader :placeholder, :value, :phrases
end
