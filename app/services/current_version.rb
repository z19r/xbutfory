# frozen_string_literal: true

# The project version, rendered as the masthead's editorial furniture.
#
# Semver maps onto the broadsheet's issue line:
#   MAJOR -> VOL.   (a new volume)
#   MINOR -> ISSUE. (the running issue number)
#   PATCH -> COR.   (a correction — hidden until it's greater than zero)
#
# The number is the single source of truth in `.current_version` at the project
# root. It's hand-maintained for now; a later release step will write it from
# the git tag. Kept immutable — build one from a string, or `.current` to read
# the file.
class CurrentVersion
  VERSION_FILE = '.current_version'
  MASTHEAD_PREFIX = 'est. 2026'

  attr_reader :major, :minor, :patch

  def initialize(string)
    @major, @minor, @patch = string.to_s.strip.split('.').map(&:to_i)
    @major ||= 0
    @minor ||= 0
    @patch ||= 0
  end

  # Read the version from `.current_version`, falling back to 0.0.0 if absent.
  def self.current
    new(read_file)
  end

  def self.read_file
    path = Rails.root.join(VERSION_FILE)
    File.exist?(path) ? File.read(path) : '0.0.0'
  end

  # e.g. "est. 2026 — vol. 1, issue 26" — with ", cor. N" only when patch > 0.
  def masthead
    line = "#{MASTHEAD_PREFIX} — vol. #{major}, issue #{minor}"
    line += ", cor. #{patch}" if patch.positive?
    line
  end

  def to_s
    [major, minor, patch].join('.')
  end
end
