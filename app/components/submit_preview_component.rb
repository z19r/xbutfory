class SubmitPreviewComponent < ViewComponent::Base
  def initialize(x: '', y: '', label: 'Live preview')
    @x = x
    @y = y
    @label = label
  end

  def display_x = @x.presence || 'X'
  def display_y = @y.presence || 'Y'
  def placeholder? = @x.blank? || @y.blank?
end
