// XbutforY — maximal-home prototype seed data. Attaches to window.
window.XBFY = window.XBFY || {};

// Muted category hues — reuse the brand's seven-hue category palette.
window.XBFY.CAT = {
  MARKETPLACE:    '#9B5523',
  SOCIAL:         '#A07A18',
  SAAS:           '#6A3D9E',
  UTILITIES:      '#2B5BA8',
  REFERENCE:      '#2A7A56',
  HEALTH:         '#B5472D',
  INFRASTRUCTURE: '#1B8080',
};

window.XBFY.ENTRIES = [
  { rank: '001', x: 'SeatGeek',   y: 'Lamps',                     stamp: 'NEW', cat: 'MARKETPLACE',
    blurb: 'Aggregated secondary-market price tracking for mid-century modern lighting fixtures.',
    by: 'lucas_m',     when: '2 hours ago',  votes: 128 },
  { rank: '002', x: 'Tinder',     y: 'the Building you live in',  stamp: 'HOT', cat: 'SOCIAL',
    blurb: 'Hyper-local matching for vertical communities. Trade sugar or find a gym partner downstairs.',
    by: 'urbanist',    when: '5 hours ago',  votes: 92 },
  { rank: '003', x: 'Salesforce', y: 'Escorts',                   stamp: null,  cat: 'SAAS',
    blurb: 'Privacy-first client relationship management tailored for high-end independent contractors.',
    by: 'dev_ops_plus', when: '12 hours ago', votes: 74 },
  { rank: '004', x: 'Linktree',   y: 'SWs',                       stamp: null,  cat: 'UTILITIES',
    blurb: 'Censorship-resistant landing pages with built-in age verification and crypto payments.',
    by: 'cryptonight', when: 'Yesterday',    votes: 61 },
  { rank: '005', x: 'IMDb',       y: 'Houseplants',               stamp: null,  cat: 'REFERENCE',
    blurb: 'Comprehensive database for cultivars, lineage tracking, and lighting requirement wikis.',
    by: 'green_thumb', when: '2 days ago',   votes: 55 },
  { rank: '006', x: 'Strava',     y: 'Deep Sleep',                stamp: null,  cat: 'HEALTH',
    blurb: 'Competitive rest tracking. Leaderboards for lowest resting heart rate and REM efficiency.',
    by: 'somnus',      when: '3 days ago',   votes: 42 },
  { rank: '007', x: 'Uber',       y: 'Dog Walkers',               stamp: null,  cat: 'MARKETPLACE',
    blurb: 'On-demand vetted dog walkers with live GPS tracks of every block and bush.',
    by: 'fetch_io',    when: '4 days ago',   votes: 38 },
  { rank: '008', x: 'Airbnb',     y: 'Datacenters',               stamp: null,  cat: 'INFRASTRUCTURE',
    blurb: 'Short-term rack rentals for ML researchers who need GPU time without a contract.',
    by: 'rackd',       when: '5 days ago',   votes: 29 },
];

// Tag cloud — weight drives font-size (classic Web 2.0 weighted cloud).
window.XBFY.TAGS = [
  { t: 'AI', w: 5 }, { t: 'dating', w: 3 }, { t: 'b2b', w: 2 }, { t: 'crypto', w: 5 },
  { t: 'niche', w: 3 }, { t: 'SaaS', w: 5 }, { t: 'marketplace', w: 3 }, { t: 'plants', w: 2 },
  { t: 'sleep', w: 3 }, { t: 'adult', w: 2 }, { t: 'hyperlocal', w: 3 }, { t: 'pets', w: 2 },
  { t: 'GPU', w: 3 }, { t: 'sober', w: 2 }, { t: 'analog', w: 3 }, { t: 'weird', w: 5 },
  { t: 'indie', w: 3 }, { t: 'nostalgia', w: 2 }, { t: 'fitness', w: 3 }, { t: 'lamps', w: 4 },
];

window.XBFY.NAV = ['Latest', 'Trending', 'Top Voted', 'Categories', 'Random', 'Submit'];

window.XBFY.FEATURED = ['DIGG', 'del.icio.us', 'MetaFilter', 'TUAW', 'Daring Fireball', 'Waxy.org'];

window.XBFY.FOOTER = {
  index:     ['Latest', 'Trending', 'Top All-Time', 'Submit a Site', 'API'],
  elsewhere: ['Twitter', 'Are.na', 'RSS Feed', 'Sitemap', 'Manifesto'],
};
