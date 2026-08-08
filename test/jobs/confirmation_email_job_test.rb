require 'test_helper'

class ConfirmationEmailJobTest < ActiveSupport::TestCase
  include ActionMailer::TestHelper

  test 'delivers the confirmation email' do
    assert_emails 1 do
      ConfirmationEmailJob.new.perform(users(:unconfirmed).id)
    end
  end

  test 'quietly no-ops when the user is gone' do
    assert_no_emails { ConfirmationEmailJob.new.perform(-1) }
  end
end
