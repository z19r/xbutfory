categories = [
  { name: "SaaS", slug: "saas", color_token: "cat-saas", description: "Software as a service, reimagined for someone." },
  { name: "Dev Tools", slug: "dev-tools", color_token: "cat-dev-tools", description: "Developer tools for niche workflows." },
  { name: "Consumer", slug: "consumer", color_token: "cat-consumer", description: "Apps for humans who buy things and have feelings." },
  { name: "AI / ML", slug: "ai-ml", color_token: "cat-ai-ml", description: "Artificial intelligence applied to unexpected domains." },
  { name: "Fintech", slug: "fintech", color_token: "cat-fintech", description: "Money things, but different money things." },
  { name: "Health", slug: "health", color_token: "cat-health", description: "Wellness and healthcare, narrowly scoped." },
  { name: "Community", slug: "community", color_token: "cat-community", description: "Gathering people around oddly specific interests." }
]

categories.each do |attrs|
  Category.find_or_create_by!(slug: attrs[:slug]) do |c|
    c.assign_attributes(attrs)
  end
end

entries_data = [
  { x: "Tinder", y: "the building you live in", description: "Swipe on your neighbors. What could go wrong? A hyperlocal social app that matches you with people in your apartment building for coffee, dog walks, or awkward elevator conversations.", submitter: "apt_4b", category: "consumer", stamp: "new", votes_count: 342 },
  { x: "Stripe", y: "lemonade stands", description: "Full payment infrastructure for the under-12 economy. Accepts allowance, Venmo from grandma, and slightly sticky dollar bills.", submitter: "squeezed_ceo", category: "fintech", votes_count: 287 },
  { x: "Figma", y: "birthday party invites", description: "Collaborative design for your 7-year-old's dinosaur-themed party. Real-time cursors, but everyone is a velociraptor.", submitter: "partymom", category: "consumer", votes_count: 198 },
  { x: "Linear", y: "household chores", description: "Sprint planning for who takes out the trash. Includes burndown charts that make passive-aggressive roommate dynamics visible.", submitter: "scrummaster_at_home", category: "saas", votes_count: 176 },
  { x: "Notion", y: "conspiracy theories", description: "A second brain for your wildest theories. Linked databases connect chemtrails to that weird noise your fridge makes.", submitter: "deepstate_pm", category: "community", sponsored: "pinned", votes_count: 156 },
  { x: "Vercel", y: "paper airplanes", description: "Deploy your paper airplane designs to the edge. Preview deployments let you test-fold before committing to the final crease.", submitter: "fold_ops", category: "dev-tools", votes_count: 134 },
  { x: "Slack", y: "your extended family", description: "Channels for #thanksgiving-planning, #who-broke-grandmas-vase, and #passive-aggressive-recipe-sharing. Threads that never resolve.", submitter: "uncle_thread", category: "consumer", stamp: "new", votes_count: 221 },
  { x: "GitHub", y: "recipes", description: "Fork grandma's lasagna. Submit a pull request to add sriracha. Merge conflicts are just arguments about cilantro.", submitter: "gitcook", category: "dev-tools", votes_count: 189 },
  { x: "Duolingo", y: "corporate jargon", description: "Learn to synergize in 5 minutes a day. The owl judges you for saying 'circle back' wrong.", submitter: "jargonaut", category: "saas", votes_count: 267 },
  { x: "Airbnb", y: "your friend's couch", description: "Professional listings for the couch you're already crashing on. Superhost status for providing a blanket.", submitter: "couch_ceo", category: "consumer", votes_count: 145 },
  { x: "ChatGPT", y: "choosing what to have for dinner", description: "An AI that argues with your dietary restrictions and suggests pizza anyway. Fine-tuned on passive-aggressive hunger.", submitter: "hangry_ai", category: "ai-ml", stamp: "new", votes_count: 312 },
  { x: "Robinhood", y: "trading lunch snacks", description: "Commission-free Goldfish cracker futures. Diamond hands on your fruit snacks. Options trading in the school cafeteria.", submitter: "snack_trader", category: "fintech", votes_count: 198 },
  { x: "Peloton", y: "office chairs", description: "Competitive spinning in your Herman Miller. Leaderboard tracks RPM of anxious swiveling during all-hands meetings.", submitter: "spin_to_win", category: "health", votes_count: 167 },
  { x: "Spotify", y: "ambient office sounds", description: "Curated playlists of keyboard clicking, coffee machine gurgling, and someone eating chips too loudly. Discover Weekly: new coworker noises.", submitter: "open_plan_dj", category: "consumer", votes_count: 234 },
  { x: "Jira", y: "home renovations", description: "Epics for 'fix that one tile.' Story points for convincing your partner the bathroom is fine. Sprint retrospective: nothing got done.", submitter: "renovate_pm", category: "saas", votes_count: 203 },
  { x: "Canva", y: "ransom notes", description: "Beautiful, accessible ransom note design. Drag-and-drop magazine cutout letters. Brand kit ensures consistent threatening.", submitter: "design_criminal", category: "consumer", sponsored: "spotlight", votes_count: 278 }
]

entries_data.each_with_index do |attrs, i|
  entry = Entry.find_or_create_by!(slug: "#{attrs[:x]}-but-for-#{attrs[:y]}".parameterize) do |e|
    e.assign_attributes(attrs)
  end
  entry.update_columns(created_at: (entries_data.length - i).hours.ago) if entry.created_at > 1.hour.ago
end

puts "Seeded #{Category.count} categories and #{Entry.count} entries."
