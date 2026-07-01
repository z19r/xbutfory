# frozen_string_literal: true

require 'simplecov'

BUSINESS_GROUPS = %w[Models Services Controllers].freeze
FRONTEND_GROUPS = %w[Components].freeze
BUSINESS_MIN = 90
FRONTEND_MIN = 65

SimpleCov.start 'rails' do
  enable_coverage :branch
  track_files 'app/{models,services,controllers,components}/**/*.rb'

  add_group 'Models', 'app/models'
  add_group 'Services', 'app/services'
  add_group 'Controllers', 'app/controllers'
  add_group 'Components', 'app/components'

  add_filter '/test/'
  add_filter '/vendor/'

  formatter SimpleCov::Formatter::MultiFormatter.new(
              [
                SimpleCov::Formatter::HTMLFormatter,
                SimpleCov::Formatter::SimpleFormatter,
              ],
            )
end

SimpleCov.at_exit do
  result = SimpleCov.result
  next unless result

  groups = result.groups.transform_values(&:covered_percent)
  failures = []

  business_pct =
    BUSINESS_GROUPS
      .filter_map { |name| groups[name] }
      .then { |values| values.empty? ? nil : values.sum / values.size }
  frontend_pct = groups['Components']

  if business_pct.nil? || business_pct < BUSINESS_MIN
    failures << "business logic #{business_pct&.round(1) || 'n/a'}% " \
      "(need #{BUSINESS_MIN}%)"
  end

  if frontend_pct.nil? || frontend_pct < FRONTEND_MIN
    failures << "components #{frontend_pct&.round(1) || 'n/a'}% " \
      "(need #{FRONTEND_MIN}%)"
  end

  next if failures.empty?

  warn "\nCoverage thresholds failed:"
  failures.each { |msg| warn "  - #{msg}" }
  warn 'See coverage/index.html for details.'
  exit 1
end
