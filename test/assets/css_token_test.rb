require "test_helper"

# Guards against the "phantom token" class of bug: a component stylesheet referencing a
# CSS custom property that no token file defines. With no fallback, the browser silently
# drops the declaration, so styles vanish without any error. This test fails loudly instead.
class CssTokenTest < ActiveSupport::TestCase
  CSS_ROOT = Rails.root.join("app/assets/stylesheets")

  # Custom properties legitimately defined outside tokens/ (component-local). Keep empty
  # unless a component intentionally defines and consumes its own scoped variable.
  # --swatch is set inline on each accent button in utility_bar; the stylesheet only consumes it.
  ALLOWLIST = %w[--swatch].freeze

  def defined_tokens
    Dir[CSS_ROOT.join("tokens/*.css")].flat_map do |file|
      File.read(file).scan(/(--[a-z0-9-]+)\s*:/).flatten
    end.to_set
  end

  test "no CSS references an undefined custom property" do
    known = defined_tokens + ALLOWLIST
    missing = Hash.new { |h, k| h[k] = [] }

    Dir[CSS_ROOT.join("**/*.css")].each do |file|
      File.read(file).scan(/var\(\s*(--[a-z0-9-]+)/).flatten.each do |ref|
        missing[ref] << file unless known.include?(ref)
      end
    end

    assert missing.empty?,
      "Phantom CSS tokens (undefined in tokens/*.css):\n" +
      missing.map { |t, fs| "  #{t} → #{fs.map { |f| File.basename(f) }.uniq.join(', ')}" }.join("\n")
  end
end
