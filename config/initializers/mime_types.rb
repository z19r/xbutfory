# Markdown responses: any page requested with `Accept: text/markdown` renders
# its `.markdown.erb` template instead of HTML (content negotiation does the
# rest — no controller changes needed).
Mime::Type.register 'text/markdown', :markdown, [], %w[md]

# ERB auto-escaping is HTML-centric; ampersands and quotes must survive
# verbatim in a markdown body.
ActiveSupport.on_load(:action_view) do
  ActionView::Template::Handlers::ERB.escape_ignore_list << 'text/markdown'
end
