# The XbutforY typographic wordmark — "XbutforY." set live in Newsreader 700 with
# the pivot "but" (and optionally the trailing "Y.") in the brand accent. No image
# asset. Two maximal flourishes: a faint offset "ghost" double-exposure and a corner
# BetaBurst. Mirrors design_system/components/brand/Wordmark.jsx.
#
# When `interactive:` is set it carries the home easter egg (the cycling Y), matching
# the original masthead behavior (logo-y Stimulus controller).
class WordmarkComponent < ViewComponent::Base
  def initialize(
    size: nil,
    responsive: false,
    accent_y: true,
    ghost: false,
    beta: false,
    beta_label: 'BETA',
    interactive: false
  )
    @size = size
    @responsive = responsive
    @accent_y = accent_y
    @ghost = ghost
    @beta = beta
    @beta_label = beta_label
    @interactive = interactive
  end

  def root_classes
    classes = ['c-wordmark']
    classes << 'c-wordmark--responsive' if @responsive
    classes.join(' ')
  end

  def root_style
    @size ? "--wm-size: #{@size.to_i}px" : nil
  end

  def y_accent?
    @accent_y
  end

  def interactive?
    @interactive
  end
end
