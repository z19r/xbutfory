class ButtonComponent < ViewComponent::Base
  VARIANTS = %w[primary secondary ghost dark].freeze
  SIZES = %w[sm md lg].freeze

  def initialize(variant: "primary", size: "md", icon: nil, trailing_arrow: false, disabled: false, tag: :button, href: nil, **html_attrs)
    @variant = variant
    @size = size
    @icon = icon
    @trailing_arrow = trailing_arrow
    @disabled = disabled
    @tag = href ? :a : tag
    @href = href
    @html_attrs = html_attrs
  end

  def call
    content_tag(@tag, class: css_classes, disabled: (@disabled if @tag == :button), href: @href, **@html_attrs) do
      safe_join([
        (@icon ? content_tag(:span, @icon, class: "c-btn__icon", aria: { hidden: true }) : nil),
        content,
        (@trailing_arrow ? content_tag(:span, "→", aria: { hidden: true }) : nil)
      ].compact)
    end
  end

  private

  def css_classes
    classes = ["c-btn", "c-btn--#{@variant}", "c-btn--#{@size}"]
    classes << "c-btn--disabled" if @disabled
    classes.join(" ")
  end
end
