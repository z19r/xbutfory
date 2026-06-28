# A labeled form field for the auth + settings screens — a mono uppercase label, an
# inset paper input, and an optional hint or error line. Pass as: :textarea for bio.
# Mirrors design_system/components/forms/FormField.jsx.
class FormFieldComponent < ViewComponent::Base
  renders_one :trailing
  renders_one :label_aside

  def initialize(
    label: nil,
    hint: nil,
    error: nil,
    prefix: nil,
    as: :input,
    mono: false,
    name: nil,
    type: "text",
    value: nil,
    id: nil,
    **input_attrs
  )
    @label = label
    @hint = hint
    @error = error
    @prefix = prefix
    @as = as.to_sym
    @mono = mono
    @name = name
    @type = type
    @value = value
    @id = id || default_id
    @input_attrs = input_attrs
  end

  attr_reader :label, :hint, :error, :prefix, :name, :value, :id

  def textarea?
    @as == :textarea
  end

  def error?
    @error.present?
  end

  def root_classes
    classes = [ "c-field" ]
    classes << "c-field--error" if error?
    classes << "c-field--textarea" if textarea?
    classes << "c-field--mono" if @mono
    classes.join(" ")
  end

  def input_classes
    classes = [ "c-field__input" ]
    classes << "c-field__input--prefixed" if @prefix
    classes << "c-field__input--trailing" if trailing?
    classes.join(" ")
  end

  def control_tag
    common = { id: @id, name: @name, class: input_classes, **@input_attrs }
    if textarea?
      content_tag(:textarea, @value, common)
    else
      tag.input(type: @type, value: @value, **common)
    end
  end

  private

  def default_id
    return nil unless @label

    "f-#{@label.to_s.downcase.gsub(/[^a-z0-9]+/, "-").delete_suffix("-")}"
  end
end
