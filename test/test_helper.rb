ENV["RAILS_ENV"] ||= "test"

require_relative "support/simplecov" if ENV["COVERAGE"]

require_relative "../config/environment"
require "rails/test_help"

# Zero-dependency singleton-method stubbing (minitest 6 split out minitest/mock).
# `impl` is returned for any args, or invoked when it responds to #call.
module StubbingHelpers
  def stub_method(object, name, impl)
    singleton = object.singleton_class
    callable = impl.respond_to?(:call) ? impl : ->(*) { impl }
    singleton.send(:alias_method, :__stubbed_original, name)
    singleton.send(:define_method, name) do |*args, **kwargs, &blk|
      callable.call(*args, **kwargs, &blk)
    end
    yield
  ensure
    singleton.send(:alias_method, name, :__stubbed_original)
    singleton.send(:remove_method, :__stubbed_original)
  end
end

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

    include StubbingHelpers

    # Add more helper methods to be used by all tests here...
  end
end

# Integration-test sign-in: every fixture user shares the password "password".
class ActionDispatch::IntegrationTest
  def sign_in_as(user, password: "password")
    post sign_in_path, params: { login: user.email, password: password }
  end
end
