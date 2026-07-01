module EmailHelper
  # A bulletproof-ish accent button for mailer views. Email clients ignore
  # external CSS, so everything is inlined; the wrapping table keeps the
  # padded background rendering in Outlook.
  def email_button(label, url)
    tag.table(
      role: 'presentation',
      cellpadding: 0,
      cellspacing: 0,
      border: 0,
      style: 'margin: 4px 0 8px;'
    ) do
      tag.tr do
        tag.td(style: 'border-radius: 8px; background-color: #c93b1b;') do
          link_to(
            label,
            url,
            style:
              'display: inline-block; padding: 13px 24px; ' \
                "font-family: 'Helvetica Neue', Arial, sans-serif; " \
                'font-weight: 600; font-size: 15px; line-height: 1; ' \
                'color: #fbf7ef; text-decoration: none; border-radius: 8px;'
          )
        end
      end
    end
  end

  # Mono, uppercase, letter-spaced eyebrow — the printed-label register.
  def email_eyebrow(text)
    tag.div(
      text,
      style:
        "font-family: 'Courier New', monospace; font-size: 11px; " \
          'letter-spacing: 0.12em; text-transform: uppercase; ' \
          'color: #c93b1b; margin: 0 0 10px;'
    )
  end
end
