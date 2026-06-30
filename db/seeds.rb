categories = [
  { name: "Dating & Hookups",        slug: "dating",    short_code: "DATING",   color_token: "cat-dating",    description: "Swiping, matching, and proximity-based longing, narrowed to a niche." },
  { name: "CRM & Sales",             slug: "crm",       short_code: "CRM",      color_token: "cat-crm",       description: "Pipelines and client notes for relationships you'd rather not explain." },
  { name: "Metasearch & Discovery",  slug: "discovery", short_code: "DISCOVER", color_token: "cat-discovery", description: "Compare everything everywhere, all at once, for one oddly specific thing." },
  { name: "SaaS & Productivity",     slug: "saas",      short_code: "SAAS",     color_token: "cat-saas",      description: "Software as a service, reimagined for someone very particular." },
  { name: "Payments & Finance",      slug: "payments",  short_code: "FINANCE",  color_token: "cat-payments",  description: "Money things, but different money things." },
  { name: "Social & Links",          slug: "social",    short_code: "SOCIAL",   color_token: "cat-social",    description: "Bios, feeds, and channels for an audience of a precise size." },
  { name: "Logistics & Services",    slug: "logistics", short_code: "SERVICES", color_token: "cat-logistics", description: "Getting things and people from here to there, narrowly scoped." }
]

categories.each do |attrs|
  category = Category.find_or_initialize_by(slug: attrs[:slug])
  category.update!(attrs)
end

entries_data = [
  { x: "Tinder", y: "the building you live in", name: "Floormate", tagline: "Swipe right on your neighbors.",
    description: "Why scroll through a whole city of strangers when the love of your life might share your elevator? Floormate matches verified residents inside your building only.",
    why: "Hyperlocal density is the cheat code dating apps forgot. Convenience plus a built-in social graph beats infinite swiping.",
    submitter: "apt_4b", category: "dating", stamp: "new", votes_count: 847, nsfw: true },
  { x: "Stripe", y: "lemonade stands", name: "Squeeze", tagline: "Tap-to-pay for the under-12 economy.",
    description: "Full payment infrastructure for the under-12 economy. Accepts allowance, Venmo from grandma, and slightly sticky dollar bills.",
    why: "Teaches entrepreneurship without a shoebox of damp dollar bills — and every transaction still needs a parent's nod.",
    submitter: "squeezed_ceo", category: "payments", votes_count: 287 },
  { x: "Figma", y: "birthday party invites", name: "Partyboard", tagline: "Collaborative design for your kid's dinosaur party.",
    description: "Collaborative design for your 7-year-old's dinosaur-themed party. Real-time cursors, but everyone is a velociraptor.",
    why: "Group invites are already a design problem; making everyone a velociraptor just makes the collaboration honest.",
    submitter: "partymom", category: "saas", votes_count: 198 },
  { x: "Linear", y: "household chores", name: "Choreflow", tagline: "Sprint planning for who takes out the trash.",
    description: "Sprint planning for who takes out the trash. Includes burndown charts that make passive-aggressive roommate dynamics visible.",
    why: "Roommate resentment is just an untracked backlog. Burndown charts make the passive-aggression visible — and assignable.",
    submitter: "scrummaster_at_home", category: "saas", votes_count: 176 },
  { x: "Notion", y: "conspiracy theories", name: "Rabbithole", tagline: "A second brain for your wildest theories.",
    description: "A second brain for your wildest theories. Linked databases connect chemtrails to that weird noise your fridge makes.",
    why: "Relational databases were always going to end up connecting the chemtrails to the fridge noise. We just shipped it first.",
    submitter: "deepstate_pm", category: "saas", sponsored: "pinned", votes_count: 156 },
  { x: "Vercel", y: "paper airplanes", name: "Foldship", tagline: "Deploy your folds to the edge.",
    description: "Deploy your paper airplane designs to the edge. Preview deployments let you test-fold before committing to the final crease.",
    why: "Preview deployments mean you test-fold before the final crease, with instant rollbacks for when the nose dives.",
    submitter: "fold_ops", category: "logistics", votes_count: 134 },
  { x: "Slack", y: "your extended family", name: "Kinfolk", tagline: "The family group chat that should've been threads.",
    description: "Channels for #thanksgiving-planning, #who-broke-grandmas-vase, and #passive-aggressive-recipe-sharing. Threads that never resolve.",
    why: "Every family already runs on unresolved threads and passive-aggressive recipe drops. Give it real infrastructure.",
    submitter: "uncle_thread", category: "social", stamp: "new", votes_count: 221 },
  { x: "GitHub", y: "recipes", name: "Forkit", tagline: "Version control for grandma's lasagna.",
    description: "Fork grandma's lasagna. Submit a pull request to add sriracha. Merge conflicts are just arguments about cilantro.",
    why: "Recipes are forked, remixed, and argued over exactly like code. Merge conflicts are just the cilantro debate, formalized.",
    submitter: "gitcook", category: "saas", votes_count: 189 },
  { x: "Duolingo", y: "corporate jargon", name: "Jargonaut", tagline: "Learn to synergize in five minutes a day.",
    description: "Learn to synergize in 5 minutes a day. The owl judges you for saying 'circle back' wrong.",
    why: "Corporate fluency is a second language nobody teaches. The owl's disappointment is a remarkably effective motivator.",
    submitter: "jargonaut", category: "saas", votes_count: 267 },
  { x: "Airbnb", y: "your friend's couch", name: "Crashpad", tagline: "Superhost status for providing a blanket.",
    description: "Professional listings for the couch you're already crashing on. Superhost status for providing a blanket.",
    why: "The couch economy already exists; it just lacks listings, reviews, and the social pressure to leave by noon.",
    submitter: "couch_ceo", category: "discovery", votes_count: 145 },
  { x: "ChatGPT", y: "choosing what to have for dinner", name: "Dinnr", tagline: "It argues with your diet and suggests pizza anyway.",
    description: "An AI that argues with your dietary restrictions and suggests pizza anyway. Fine-tuned on passive-aggressive hunger.",
    why: "Decision fatigue peaks at 6pm. Outsourcing the fight to a model that's seen every recipe is the obvious move.",
    submitter: "hangry_ai", category: "discovery", stamp: "new", votes_count: 312 },
  { x: "Robinhood", y: "trading lunch snacks", name: "SnackEx", tagline: "Commission-free Goldfish futures.",
    description: "Commission-free Goldfish cracker futures. Diamond hands on your fruit snacks. Options trading in the school cafeteria.",
    why: "Kids already trade snacks with brutal market efficiency. A ticker just makes the cafeteria's invisible hand visible.",
    submitter: "snack_trader", category: "payments", votes_count: 198 },
  { x: "Peloton", y: "office chairs", name: "Swivel", tagline: "Competitive spinning in your Herman Miller.",
    description: "Competitive spinning in your Herman Miller. Leaderboard tracks RPM of anxious swiveling during all-hands meetings.",
    why: "Nervous swiveling is wasted energy. Gamify the all-hands fidget and you've invented a fitness category from thin air.",
    submitter: "spin_to_win", category: "social", votes_count: 167 },
  { x: "Spotify", y: "ambient office sounds", name: "Desktape", tagline: "Discover Weekly, but for coworker noises.",
    description: "Curated playlists of keyboard clicking, coffee machine gurgling, and someone eating chips too loudly. Discover Weekly: new coworker noises.",
    why: "Remote workers miss the hum. Curated open-plan ambience is nostalgia-as-a-service for the home office.",
    submitter: "open_plan_dj", category: "discovery", votes_count: 234 },
  { x: "Jira", y: "home renovations", name: "Renov8", tagline: "Story points for 'fix that one tile.'",
    description: "Epics for 'fix that one tile.' Story points for convincing your partner the bathroom is fine. Sprint retrospective: nothing got done.",
    why: "Home projects die in scope creep and shifting priorities — exactly the chaos ticketing systems were built to contain.",
    submitter: "renovate_pm", category: "logistics", votes_count: 203 },
  { x: "Canva", y: "ransom notes", name: "Noteworthy", tagline: "Beautiful, accessible threats.",
    description: "Beautiful, accessible ransom note design. Drag-and-drop magazine cutout letters. Brand kit ensures consistent threatening.",
    why: "Even coercion benefits from a brand kit. Templates keep your demands on-message and your kerning menacing.",
    submitter: "design_criminal", category: "saas", sponsored: "spotlight", votes_count: 278 },
  { x: "Linktree", y: "sex workers", name: "RedLink", tagline: "Bio links with privacy baked in.",
    description: "Privacy-first link-in-bio for adult creators: geofencing, custom domains, and payment integrations that actually work for this industry instead of banning you on day three.",
    why: "The incumbents quietly ban this entire vertical. RedLink builds for them on purpose, and that loyalty is a moat money can't buy.",
    submitter: "discreet_dev", category: "social", votes_count: 2341, nsfw: true },
  { x: "Salesforce", y: "escorts", name: "ClientForce", tagline: "Manage your most important relationships.",
    description: "A full CRM — booking management, client notes, rate tracking, scheduling, invoicing — for independent providers who run a serious, professional operation. Calendar sync included.",
    why: "A massive, underserved, cash-rich market that mainstream SaaS won't touch. First mover wins the whole category.",
    submitter: "anon", category: "crm", votes_count: 1204, nsfw: true },
  { x: "Grindr", y: "co-working spaces", name: "Gridnr", tagline: "Hot desks. Hot people.",
    description: "Find the creative professionals who are also single in your shared workspace. Because office romance, as everyone knows, never once goes badly.",
    why: "Proximity plus repeated low-stakes encounters is how attraction actually forms. The workspace already manufactures both, daily.",
    submitter: "hotdesk", category: "dating", votes_count: 312, nsfw: true }
]

# Members own every submission. Seed the placeholder "legacy" owner (the migration's
# backfill target) plus one user per submitter handle. Dev password for all: "password".
SEED_PASSWORD = "password"

users_by_handle = {}
([ "legacy" ] + entries_data.map { |attrs| attrs[:submitter] }).uniq.each do |handle|
  user = User.find_or_initialize_by(handle: handle)
  user.display_name ||= handle.tr("_", " ").split.map(&:capitalize).join(" ")
  user.email ||= "#{handle}@xbutfory.example"
  user.password = SEED_PASSWORD if user.new_record?
  user.save!
  users_by_handle[handle] = user
end

# Make one member an editor (admin) so the moderation queue is reachable in dev.
users_by_handle["apt_4b"]&.update_column(:admin, true)

entries_data.each_with_index do |attrs, i|
  entry = Entry.find_or_initialize_by(slug: "#{attrs[:x]}-but-for-#{attrs[:y]}".parameterize)
  entry.assign_attributes(attrs.except(:submitter)) # submitter column dropped; still used for user mapping
  entry.user = users_by_handle.fetch(attrs[:submitter])
  entry.save!
  entry.update_columns(created_at: (entries_data.length - i).hours.ago) if entry.created_at > 1.hour.ago
end

puts "Seeded #{User.count} users, #{Category.count} categories and #{Entry.count} entries."
