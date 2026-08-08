require 'test_helper'

class DigestEmailJobTest < ActiveSupport::TestCase
  include ActionMailer::TestHelper

  def make_entry(**attrs)
    Entry.create!(
      { user: users(:member), x: 'Uber', y: 'llamas', tier: 'free' }
        .merge(attrs),
    )
  end

  test 'delivers the digest for still-live entries' do
    entry = make_entry
    assert_emails 1 do
      DigestEmailJob.new.perform('reader@example.com', [entry.id], nil)
    end
  end

  test 'skips delivery when every entry has gone non-live since enqueue' do
    entry = make_entry(status: 'pending')
    assert_no_emails do
      DigestEmailJob.new.perform('reader@example.com', [entry.id], nil)
    end
  end
end
