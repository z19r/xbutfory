class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch('MAIL_FROM', 'XbutforY <hello@xbutfory.example>')
  layout 'mailer'
end
