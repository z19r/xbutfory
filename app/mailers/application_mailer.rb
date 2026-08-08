class ApplicationMailer < ActionMailer::Base
  # From lives on the root domain; Mailgun signs via mg.xbutfory.com, which
  # aligns under relaxed DMARC. Override with MAIL_FROM if that changes.
  default from: ENV.fetch('MAIL_FROM', 'XbutforY <hello@xbutfory.com>')
  layout 'mailer'
  helper EmailHelper
end
