atom_feed(language: "en-US") do |feed|
  feed.title("XbutforY — Latest Submissions")
  feed.subtitle("A hand-curated index of newly launched 'X but for Y' websites.")
  feed.updated(@entries.first&.created_at || Time.current)

  @entries.each do |entry|
    feed.entry(
      entry,
      url: entry_url(entry.slug),
      id: "tag:#{request.host},2026:entry/#{entry.slug}",
      published: entry.created_at,
      updated: entry.updated_at
    ) do |item|
      item.title(entry.title)
      item.content(entry.description.to_s, type: "html")
      item.author { |author| author.name("@#{entry.user.handle}") }
    end
  end
end
