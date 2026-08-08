require 'test_helper'

class ApplicationMailerTest < ActiveSupport::TestCase
  test 'default from is a real xbutfory.com address, not a placeholder' do
    from = ApplicationMailer.default[:from]
    assert_match(/@xbutfory\.com>?\z/, from)
    assert_no_match(/example/, from)
  end
end
