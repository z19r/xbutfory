require 'test_helper'

class DigestMailerTest < ActionMailer::TestCase
  test 'weekly is addressed to the recipient and lists the entries' do
    entry = entries(:one)
    mail = DigestMailer.weekly(email: 'reader@example.com', entries: [entry])

    assert_equal ['reader@example.com'], mail.to
    assert_match(/X but for Y/, mail.subject)
    assert_match entry.title, mail.body.encoded
  end

  test 'a tokenized recipient gets an unsubscribe link' do
    sub = DigestSubscription.create!(email: 'reader@example.com')
    token = sub.generate_token_for(:unsubscribe)
    mail =
      DigestMailer.weekly(
        email: sub.email,
        entries: [entries(:one)],
        unsubscribe_token: token,
      )

    assert_match '/digest/unsubscribe/', mail.body.encoded
  end

  test 'a member recipient gets no unsubscribe link' do
    mail =
      DigestMailer.weekly(email: 'member@example.com', entries: [entries(:one)])
    assert_no_match(/unsubscribe/, mail.body.encoded)
  end
end
