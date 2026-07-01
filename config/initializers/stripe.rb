# Stripe API key + webhook secret, read from credentials with an ENV override.
# Absent in CI/dev without keys — that's fine, the test suite stubs Stripe and
# never makes a live call.
Rails.application.configure do
  creds = Rails.application.credentials.stripe || {}

  Stripe.api_key = ENV['STRIPE_SECRET_KEY'].presence || creds[:secret_key]

  config.x.stripe.publishable_key =
    ENV['STRIPE_PUBLISHABLE_KEY'].presence || creds[:publishable_key]
  config.x.stripe.webhook_secret =
    ENV['STRIPE_WEBHOOK_SECRET'].presence || creds[:webhook_secret]
end
