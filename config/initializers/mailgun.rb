# frozen_string_literal: true

require 'mailgun-ruby'

Mailgun.configure do |config|
  config.api_key = ENV.fetch('MAILGUN_API_KEY', nil)
end
