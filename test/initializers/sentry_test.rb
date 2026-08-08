require 'test_helper'

class SentryInitializerTest < ActiveSupport::TestCase
  test 'stays dormant without a DSN (dev/test are silent)' do
    assert_not Sentry.initialized?
  end
end
