require 'test_helper'

class PasswordResetEmailJobTest < ActiveSupport::TestCase
  include ActionMailer::TestHelper

  test 'delivers the password reset email' do
    assert_emails 1 do
      PasswordResetEmailJob.new.perform(users(:member).id)
    end
  end

  test 'quietly no-ops when the user is gone' do
    assert_no_emails { PasswordResetEmailJob.new.perform(-1) }
  end
end
