source 'https://rubygems.org'

# Bundle edge Rails instead: gem "rails", github: "rails/rails", branch: "main"
gem 'rails', '~> 8.1.3'
# The modern asset pipeline for Rails [https://github.com/rails/propshaft]
gem 'propshaft'
# Use postgresql as the database for Active Record
gem 'pg', '~> 1.1'
# Use the Puma web server [https://github.com/puma/puma]
gem 'puma', '>= 5.0'
# Use JavaScript with ESM import maps [https://github.com/rails/importmap-rails]
gem 'importmap-rails'
# Hotwire's SPA-like page accelerator [https://turbo.hotwired.dev]
gem 'turbo-rails'
# Hotwire's modest JavaScript framework [https://stimulus.hotwired.dev]
gem 'stimulus-rails'
# Component-based view architecture [https://viewcomponent.org]
gem 'view_component'

# Use Active Model has_secure_password [https://guides.rubyonrails.org/active_model_basics.html#securepassword]
gem 'bcrypt', '~> 3.1.7'

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: %i[windows jruby]

# Use the database-backed adapters for Rails.cache and Action Cable
gem 'solid_cache'
gem 'solid_cable'

# Background jobs run on Sidekiq (Redis-backed) — the house standard.
gem 'sidekiq', '~> 8.0'
# Sidekiq 7 calls TimedStack#pop(timeout); connection_pool 3.0 removed that
# positional arg, so pin to the 2.x line until we move to Sidekiq 8.
gem 'connection_pool', '~> 3.0'
# Cron-style recurring jobs for Sidekiq (weekly digest, cleanup, etc.)
# >= 2.4 avoids the XSS advisory GHSA-xv9c-mjw8-79gf (CVE-2025-67202).
gem 'sidekiq-cron', '~> 2.4'

# Reduces boot times through caching; required in config/boot.rb
gem 'bootsnap', require: false

# Deploy this application anywhere as a Docker container [https://kamal-deploy.org]
gem 'kamal', require: false

# Add HTTP asset caching/compression and X-Sendfile acceleration to Puma [https://github.com/basecamp/thruster/]
gem 'thruster', require: false

# Use Active Storage variants [https://guides.rubyonrails.org/active_storage_overview.html#transforming-images]
gem 'image_processing', '~> 2.0'

# Mail delivery via the Mailgun API (Z19R standard — see markbin-dot-net;
# delivery_method :mailgun in production.rb) [https://github.com/mailgun/mailgun-ruby]
gem 'mailgun-ruby', '~> 1.4.0'

# Payments for the Featured listing tier [https://github.com/stripe/stripe-ruby]
gem 'stripe', '~> 19.6'

# State machines for entry/product/user/payment lifecycles [https://github.com/aasm/aasm]
gem 'aasm', '~> 6.0'

# Request throttling on auth/submit/vote/AI endpoints
# [https://github.com/rack/rack-attack]
gem 'rack-attack', '~> 6.7'
# RedisCacheStore backing rack-attack's throttle counters in production.
# Sidekiq only brings redis-client, which Rails' cache store can't use.
gem 'redis', '>= 4.0.1'

# Error tracking — web + Sidekiq report to one DSN; dormant without one
# [https://github.com/getsentry/sentry-ruby]
gem 'sentry-rails', '~> 6.3'
gem 'sentry-ruby', '~> 6.3'
gem 'sentry-sidekiq', '~> 6.3'
# Sampling profiler backing Sentry profiling (config.profiler_class)
gem 'vernier'

group :development, :test do
  # See https://guides.rubyonrails.org/debugging_rails_applications.html#debugging-with-the-debug-gem
  gem 'debug', platforms: %i[mri windows], require: 'debug/prelude'

  # Audits gems for known security defects (use config/bundler-audit.yml to ignore issues)
  gem 'bundler-audit', require: false

  # Static analysis for security vulnerabilities [https://brakemanscanner.org/]
  gem 'brakeman', require: false

  # Omakase Ruby styling [https://github.com/rails/rubocop-rails-omakase/]
  gem 'rubocop-rails-omakase', require: false

  gem 'solargraph', require: false

  # Prettier Ruby formatter (via @prettier/plugin-ruby)
  gem 'prettier_print', require: false
  gem 'syntax_tree', require: false
end

group :development do
  # Use console on exceptions pages [https://github.com/rails/web-console]
  gem 'web-console'

  # View outgoing email in an in-app inbox at /letter_opener (no browser launch
  # needed, unlike plain letter_opener) [https://github.com/fgrehm/letter_opener_web]
  gem 'letter_opener_web', '~> 3.0'
end

group :test do
  # Use system testing [https://guides.rubyonrails.org/testing.html#system-testing]
  gem 'capybara'
  gem 'selenium-webdriver'

  # Line coverage + threshold enforcement in CI
  gem 'simplecov', require: false
end
