class UtilityBarComponent < ViewComponent::Base
  # The six themeable accents. Each maps to an `--accent-<key>` token in
  # tokens/colors.css; selecting one sets `--accent` to that token, which is the
  # single knob that re-themes the wordmark, buttons, stamps, nav and links.
  ACCENTS = [
    { key: 'magenta', label: 'Magenta' },
    { key: 'vermilion', label: 'Vermilion' },
    { key: 'teal', label: 'Teal' },
    { key: 'violet', label: 'Violet' },
    { key: 'ochre', label: 'Ochre' },
    { key: 'ink', label: 'Ink' },
  ].freeze

  DEFAULT_ACCENT = 'magenta'.freeze

  # Look up an accent by key, falling back to the default for anything unknown
  # (untrusted cookie values pass through here).
  def self.resolve_accent(key)
    ACCENTS.find { |a| a[:key] == key } || ACCENTS.first
  end

  def initialize(issue: nil, active_accent: DEFAULT_ACCENT, current_user: nil)
    @issue = issue || CurrentVersion.current.masthead
    @active_accent = self.class.resolve_accent(active_accent)[:key]
    @current_user = current_user
  end

  attr_reader :issue, :active_accent, :current_user

  def accents = ACCENTS

  # The token reference applied to `--accent` for a given accent key.
  def accent_var(key) = "var(--accent-#{key})"
end
