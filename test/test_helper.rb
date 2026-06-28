ENV["RAILS_ENV"] ||= "test"

require_relative "support/simplecov" if ENV["COVERAGE"]

require_relative "../config/environment"
require "rails/test_help"

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    if ENV["COVERAGE"]
      parallelize_setup do |worker|
        SimpleCov.command_name("minitest-#{worker}")
      end

      parallelize_teardown { |_worker| SimpleCov.result }
    end

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
  end
end

# Integration-test sign-in: every fixture user shares the password "password".
class ActionDispatch::IntegrationTest
  def sign_in_as(user, password: "password")
    post sign_in_path, params: { email: user.email, password: password }
  end
end
