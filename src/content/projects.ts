import { asset } from './asset';

export type Swatch = { name: string; hex: string };
export type Shot = { src: string; alt: string; kind: 'desktop' | 'phone' | 'board' };

export type Project = {
  slug: string;
  title: string;
  year: string;
  kind: string;
  oneLiner: string;
  role: string;
  credit?: string;
  links: { label: string; href: string }[];
  theme: { paper: string; ink: string; accent: string; wash: string };
  sticker: string; // short handwritten note on the polaroid
  status: string; // circled on the projects page
  notes: [string, string]; // handwritten margin notes
  cat: { pose: 'sit' | 'loaf' | 'peek'; eyes: 'copper' | 'blue' | 'green' };
  gist: string[];
  why: string;
  stack: { name: string; note: string }[];
  build: string[];
  look: { intro: string; fonts: string[]; palette: Swatch[] };
  features: string[];
  shots: Shot[];
  learned: string;
};

export const projects: Project[] = [
  {
    slug: 'then-and-now-mumbai',
    title: 'Then & Now Mumbai',
    year: '2026',
    kind: 'Pixel game · Data story',
    oneLiner: 'A pixel-art Mumbai street where every shop is a dataset. Walk into the chai tapri, ask what things cost, and drag the Time Machine from 1995 to today.',
    role: 'Idea, data research, game design, pixel art, code',
    links: [
      { label: 'Play it live', href: 'https://then-and-now-mumbai.vercel.app' },
      { label: 'Code on GitHub', href: 'https://github.com/itsharshhy/then-and-now-mumbai' },
    ],
    theme: { paper: '#fbf3d9', ink: '#1a2544', accent: '#b8232f', wash: '#f2c230' },
    sticker: 'chai was ₹2 once',
    status: 'live',
    notes: ['every price sourced, or honestly flagged', 'vada pav beat inflation!'],
    cat: { pose: 'loaf', eyes: 'copper' },
    gist: [
      'Fly over a Mumbai or Delhi neighbourhood from above, walk into the chai tapri, the vada pav cart, the kirana or the railway station, and the shopkeeper tells you what things cost now, and what they cost in 1995.',
      'Drag the Time Machine and the whole city changes around you: mill chimneys give way to a glass mall, Metro Line 1 appears overhead in 2014, the Padmini taxis disappear in 2023. Then try to survive a month in the year of your choice, or switch to Analyst Mode for the charts and every source.',
    ],
    why: 'Everyone in Mumbai has a story about what chai or the local train "used to cost", but street prices were never published as a series. I wanted to turn those stories into something you can walk through, and be honest about which numbers are documented and which are only estimates.',
    stack: [
      { name: 'TypeScript', note: 'the game, the pages, multiplayer, the bazaar' },
      { name: 'Next.js 16 + React 19', note: 'static export, so it runs anywhere' },
      { name: 'Phaser 4', note: 'the pixel city, camera, zoom, traffic and trains' },
      { name: 'Python', note: 'builds the price data from sourced spreadsheets' },
      { name: 'Supabase', note: 'Realtime rooms and the reviewed bazaar database' },
      { name: 'Electron + Capacitor', note: 'Mac, Windows and Android apps' },
      { name: 'Vercel', note: 'every push to main goes live' },
    ],
    build: [
      'Every sprite is a text grid painted in code, so the whole city has no image files. Two cities, walk-in interiors, traffic, local trains and a drone-view camera with zoom.',
      'A Python pipeline turns a spreadsheet of price anchors into the game\'s data: it fills the years between anchors, adjusts for inflation with India\'s CPI, and works out how many minutes of work each price cost.',
      'Every price has a confidence level (documented, reported, estimated or interpolated), and the shopkeepers say so out loud. Hollow dots in the charts mark the estimates.',
      'Walk with up to 8 friends: each room is a Supabase Realtime channel with a shared Time Machine, chat bubbles and no game server at all.',
      'The bazaar lets players ask about prices and report what they paid. Nothing goes public until a reviewer approves it, and the database is locked down with row-level security and rate limits.',
      'It installs like an app and plays offline, with real downloads for Android, Windows and Mac built by GitHub Actions.',
    ],
    look: {
      intro: 'Chunky pixel lettering on a Mumbai dusk navy, with kaali-peeli taxi yellow and BEST-bus red as the accents. Analyst Mode switches to a calm, plain report so the data reads clearly.',
      fonts: ['Silkscreen (pixel headlines)', 'Bricolage Grotesque (body)'],
      palette: [
        { name: 'dusk', hex: '#26365E' },
        { name: 'night', hex: '#1A2544' },
        { name: 'taxi', hex: '#F2C230' },
        { name: 'BEST red', hex: '#B8232F' },
        { name: 'sky glow', hex: '#F2A65A' },
        { name: 'chalk', hex: '#F3F5F7' },
      ],
    },
    features: [
      'Time Machine from 1995 to 2026, the whole city changes',
      'Mumbai and Delhi, with walk-in shops and stations',
      'Survive the month: a budget game in any year',
      'Shareable price postcards',
      'Multiplayer rooms for up to 8 friends',
      'Analyst Mode with charts, method and every source',
    ],
    shots: [
      { src: asset('/work/then-and-now-desktop.webp'), alt: 'Then & Now landing page: "Walk thirty years of Indian street prices" beside the pixel city on a laptop and a phone', kind: 'desktop' },
      { src: asset('/work/then-and-now-phone.webp'), alt: 'The pixel street on a phone, standing outside the chai tapri, with the Time Machine at 2026', kind: 'phone' },
      { src: asset('/work/then-and-now-street.webp'), alt: 'Mumbai from above: the chai tapri, a chawl, the Metro line and the Time Machine slider', kind: 'desktop' },
    ],
    learned: 'Data is only as good as its honesty. The hardest and most useful part was not the game, it was saying clearly which numbers I could prove and which I had to guess, and building that into what the shopkeepers say.',
  },
  {
    slug: 'design-roadmap',
    title: 'Design Roadmap',
    year: '2026',
    kind: 'Field guide · Website',
    oneLiner: "A research-backed field guide to graphic design from absolute zero, where every idea is explained twice: once properly, and once like you're ten.",
    role: 'Research, writing, design, illustration, code',
    links: [
      { label: 'Read the guide', href: 'https://itsharshhy.github.io/design-roadmap/' },
      { label: 'Code on GitHub', href: 'https://github.com/itsharshhy/design-roadmap' },
    ],
    theme: { paper: '#f3ede2', ink: '#16130f', accent: '#e2462b', wash: '#e9e1d2' },
    sticker: 'learn to see before you design',
    status: 'live',
    notes: ["every idea, explained like you're ten", '32 studies, rated by evidence'],
    cat: { pose: 'sit', eyes: 'green' },
    gist: [
      'Design Roadmap takes a total beginner from "I know nothing" to a real portfolio across eight chapters: taste, design psychology, colour, typography, layout, market research, a 12-month roadmap and a research library.',
      'Every chapter opens with a 30-second animated explainer, and the pages are full of things to play with: a colour harmony machine, a contrast checker, a type-scale generator, a hierarchy toggle and a progress tracker for the roadmap.',
    ],
    why: "Most design advice is either vague (\"trust your eye\") or a pile of rules with no reasons. I wanted one place that explains why some colours feel trustworthy and some fonts feel cheap, backed by real studies, and honest about which famous stats are shakier than people claim.",
    stack: [
      { name: 'HTML', note: 'nine hand-written pages, no build step' },
      { name: 'CSS', note: 'one stylesheet, paper texture, responsive' },
      { name: 'Vanilla JavaScript', note: 'the interactive tools and the explainers' },
      { name: 'Keyframe engine', note: 'a tiny custom animation system in app.js' },
      { name: 'localStorage', note: 'saves your roadmap progress in the browser' },
      { name: 'GitHub Pages', note: 'free hosting, live on every push' },
    ],
    build: [
      'No framework and no build step: plain HTML, CSS and a little JavaScript, so any page opens straight from the file.',
      'The animated explainers run on a tiny keyframe engine I wrote: each shape carries a list of per-step styles, and CSS transitions do the in-betweening. They play when scrolled into view, with play, pause, replay and clickable steps.',
      'Every number links to its source. The research library rates 32 studies, standards and frameworks by strength of evidence, and the colour chapter has a myth check for stats that get repeated without support.',
      'Interactive labs let you learn by doing: pick a harmony, check contrast, generate a type scale, toggle hierarchy on and off, and slide a brand\'s personality.',
      'The 12-month roadmap remembers which steps you have finished, saved privately in your own browser.',
      'All motion respects the "reduce motion" setting.',
    ],
    look: {
      intro: 'An editorial field guide on warm paper: big Fraunces headlines with one italic red word, mono labels, and bold Bauhaus-style shapes (a yellow circle, a red square, a green triangle, a blue dot) as the illustration language.',
      fonts: ['Fraunces (headlines)', 'Instrument Sans (body)', 'JetBrains Mono (labels)'],
      palette: [
        { name: 'paper', hex: '#F3EDE2' },
        { name: 'ink', hex: '#16130F' },
        { name: 'red', hex: '#E2462B' },
        { name: 'yellow', hex: '#F0B42E' },
        { name: 'blue', hex: '#2340D8' },
        { name: 'green', hex: '#1F5C4A' },
      ],
    },
    features: [
      'Eight chapters, from taste to a 12-month plan',
      'A 30-second animated explainer on every page',
      'Colour harmony machine and contrast checker',
      'Readability lab and type-scale generator',
      'Roadmap progress tracker saved in your browser',
      'Research library of 32 sources rated by evidence',
    ],
    shots: [
      { src: asset('/work/design-roadmap-desktop.webp'), alt: 'Design Roadmap home page: "Learn to see before you design" beside an eye drawn among bold shapes', kind: 'desktop' },
      { src: asset('/work/design-roadmap-phone.webp'), alt: 'Design Roadmap on a phone', kind: 'phone' },
      { src: asset('/work/design-roadmap-colour.webp'), alt: 'Chapter 03, Colour: "Colour is a feeling you can measure" beside a colour wheel', kind: 'desktop' },
    ],
    learned: 'Teaching something is the fastest way to find out what you only half understood. Writing every idea twice, once for an expert and once for a ten-year-old, made me check every claim, and cut a lot of the ones that did not hold up.',
  },
  {
    slug: 'plant-a-thought',
    title: 'Plant a Thought',
    year: '2026',
    kind: 'Web game · PWA',
    oneLiner: 'A cozy hopping game where every answer you write grows into a flower, alone or with the people you care about.',
    role: 'Idea, game design, illustration, code',
    links: [
      { label: 'Play it live', href: 'https://plant-a-thought.vercel.app' },
      { label: 'Code on GitHub', href: 'https://github.com/itsharshhy/plant-a-thought' },
    ],
    theme: { paper: '#eef5e6', ink: '#24352a', accent: '#6b8f5a', wash: '#cfe6f1' },
    sticker: 'hop · plant · grow',
    status: 'live',
    notes: ['same question for everyone, every day', 'no timers. no losing.'],
    cat: { pose: 'peek', eyes: 'green' },
    gist: [
      'You hop from island to island. Every few islands the game asks you a question, and whatever you write grows into a flower in your garden.',
      'Play a calm walk with no timers and no losing, answer the same question as everyone else today, climb crumbling islands, or open a live room with a friend using a code like MOSS-4821.',
    ],
    why: 'Most "check-in" apps feel like homework. I wanted the question to arrive as a reward in the middle of a game, so talking about how you feel becomes something you do on the way somewhere, not a chore.',
    stack: [
      { name: 'TypeScript', note: 'strict mode, the whole game' },
      { name: 'Vite', note: 'dev server and bundler' },
      { name: 'Canvas 2D', note: 'every animal, island and flower is drawn in code' },
      { name: 'Supabase', note: 'Postgres + Realtime for live rooms and shared gardens' },
      { name: 'PWA', note: 'service worker, installable, plays offline' },
      { name: 'Vitest + Playwright', note: 'unit tests and end-to-end tests on phone sizes' },
      { name: 'Vercel', note: 'every push to main goes live' },
    ],
    build: [
      'No UI framework: the menus are plain DOM panels and the game itself is drawn on a single <canvas>. That keeps it tiny and fast on cheap phones.',
      'Live rooms use Supabase Realtime Broadcast and Presence, so two people can hop together and see each other in real time.',
      'Shared gardens ("circles") hold up to 30 people. The database has row-level security on with no open policies; the app may only call carefully written Postgres functions, so nobody can read what they should not.',
      'Your journal never leaves your device. Only what you choose to plant in a shared garden is uploaded, and the ID that lets you delete your own thoughts is stored hashed.',
      'A safety check notices if something you write sounds like you might be in danger and gently offers free helplines.',
      'Islands are sized so they always fit the narrowest phone, and that rule is enforced by a unit test.',
    ],
    look: {
      intro: 'Soft sky gradients, drifting clouds and a sage-green garden. Frosted panels sit over the game so it always feels like you are outdoors.',
      fonts: ['Fraunces (headings)', 'Nunito (body)', 'Caveat (handwritten notes)'],
      palette: [
        { name: 'sky', hex: '#A9D8E6' },
        { name: 'mist', hex: '#DCEFE9' },
        { name: 'sage', hex: '#6B8F5A' },
        { name: 'cream', hex: '#F5EEDC' },
        { name: 'forest', hex: '#24352A' },
      ],
    },
    features: [
      'Calm walk, Today’s question, Climb and Dodge modes',
      'Live rooms with friends via room codes or invite links',
      'Shared gardens with hosts, anonymous mode and watering',
      'Question packs for friends, couples, teams, kids and exam season, in English and Hindi',
      'Private on-device journal you can export or delete',
    ],
    shots: [
      { src: asset('/work/plant-a-thought-desktop.webp'), alt: 'Plant a Thought home screen on a laptop, with today’s question and play modes', kind: 'desktop' },
      { src: asset('/work/plant-a-thought-phone.webp'), alt: 'Plant a Thought on a phone', kind: 'phone' },
    ],
    learned: 'Making something gentle takes a lot of rules. The calmest parts of this game are backed by the strictest code: database permissions, length limits on everything another player sends, and tests that check islands fit a 320px phone.',
  },
  {
    slug: 'pebble',
    title: 'Pebble',
    year: '2026',
    kind: 'Desktop app · Open source',
    oneLiner: 'A calm, private place to set your worries down, and see how many of them actually happened.',
    role: 'Research, product design, code',
    links: [
      { label: 'Code on GitHub', href: 'https://github.com/itsharshhy/pebble' },
      { label: 'Download', href: 'https://github.com/itsharshhy/pebble/releases/latest' },
    ],
    theme: { paper: '#f5efe6', ink: '#2c332e', accent: '#4e6a57', wash: '#e3eadf' },
    sticker: 'did it happen?',
    status: 'in testing',
    notes: ['no red. no streaks. ever.', 'works 100% offline'],
    cat: { pose: 'loaf', eyes: 'copper' },
    gist: [
      'You write a worry in one line and pick a day to look back. On that day Pebble asks one gentle question: did it happen?',
      'Over time you build a quiet, personal record of how often your mind’s forecasts came true. It runs on Windows, macOS and Linux.',
    ],
    why: 'Pebble is based on the Worry Outcome Journal, a technique from anxiety research. In one small study, 91.4% of tracked worries didn’t come true (LaFreniere & Newman, 2020). I wanted that idea in an app that never adds pressure of its own.',
    stack: [
      { name: 'Tauri 2', note: 'native desktop shell, tiny installers' },
      { name: 'Rust', note: 'saves your worries to a local file' },
      { name: 'Vanilla JavaScript', note: 'ES modules, a small router and five views' },
      { name: 'CSS', note: 'day and evening palettes, reduced-motion aware' },
      { name: 'GitHub Actions', note: 'builds installers for all three systems' },
    ],
    build: [
      'The app is a Tauri shell with a Rust core. The Linux installer is under 3 MB, because a calm app should also be a light one.',
      'There is no account, no server and no internet. Your words stay in a file on your computer, and Tauri’s security settings block the app from sending anything anywhere.',
      'The interface is plain JavaScript modules: Today, New worry, Check back, Garden and Settings, wired together by a tiny hand-written router.',
      'It ships with a full handbook: personas, user stories, architecture, a data model, a safety plan and a science page that cites the research behind every feature.',
      'Every change has to pass the Calm Audit, an 8-question check. One filled button per screen, three choices or fewer, no red, no streaks, no countdowns, and “would you show this to someone having a bad day?”',
    ],
    look: {
      intro: 'Warm paper, sage green and soft pebble shapes. Red is banned. The only “attention” colour is a gentle clay, used once, for “It happened”. In the evening the whole app shifts to a softer palette.',
      fonts: ['Inter (everything, at calm sizes)'],
      palette: [
        { name: 'paper', hex: '#F5EFE6' },
        { name: 'sage', hex: '#93AB98' },
        { name: 'sage deep', hex: '#4E6A57' },
        { name: 'sand', hex: '#EEDFCA' },
        { name: 'clay', hex: '#CF9F82' },
      ],
    },
    features: [
      'One-line worries with a look-back date',
      '“Did it happen?” check-ins with three kind answers',
      'An optional breath pause before looking back',
      'A garden of pebbles showing your own record',
      'Free and open source under MIT',
    ],
    shots: [
      { src: asset('/work/pebble-screens.webp'), alt: 'Pebble design board showing the Today, Breath pause and Check-back screens', kind: 'board' },
    ],
    learned: 'Writing the rules down first (what the app must never do) made every design decision faster. When a feature idea came up, the Calm Audit had usually already answered it.',
  },
  {
    slug: 'seven-wonders-studio',
    title: '7 Wonders Studio',
    year: '2026',
    kind: 'Client website · Pitch',
    oneLiner: 'A minimal, editorial website for a unisex salon on Hill Road, Bandra West, built to win the client over in a single meeting.',
    role: 'Research, pitch, design, code',
    credit: 'Made with Aspersh Upadhyay',
    links: [
      { label: 'Visit the site', href: 'https://7-wonders-studio.vercel.app' },
      { label: 'Code on GitHub', href: 'https://github.com/itsharshhy/7-wonders-studio' },
    ],
    theme: { paper: '#f5f3ef', ink: '#171514', accent: '#9e776b', wash: '#ebe3dc' },
    sticker: 'seven ways to feel wonderful',
    status: 'pitched',
    notes: ['one tap → WhatsApp booking', 'b&w photos bloom into colour'],
    cat: { pose: 'sit', eyes: 'blue' },
    gist: [
      '7 Wonders Studio is a hair, skin and grooming salon on one of Mumbai’s most competitive salon streets. It had Instagram and listing sites, but no website of its own.',
      'We designed the site, wrote a full product brief and a pitch guide, and deployed a live demo so the owner could open it on their own phone.',
    ],
    why: 'When someone searches for a salon in Bandra, they land on listing pages that also advertise every competitor. A website of its own lets the studio look as premium as it is, and lets people book on WhatsApp in ten seconds.',
    stack: [
      { name: 'HTML', note: 'one file, no build step' },
      { name: 'CSS', note: 'three colour modes, responsive to 360px' },
      { name: 'JavaScript', note: 'theme switcher, WhatsApp booking, image fallbacks' },
      { name: 'Google Fonts', note: 'Italiana, Cormorant Garamond, Jost' },
      { name: 'Vercel', note: 'live demo link for the meeting' },
    ],
    build: [
      'The whole landing page is a single index.html, so it loads instantly and anyone can open it, even without a server.',
      'The menu turns the name into the structure: services are organised as “The Seven Wonders”, numbered I to VII.',
      'Booking opens WhatsApp with the request already typed out, so the staff don’t need to learn any new software.',
      'Visitors can switch between Warm, Light and Dark modes, and the site remembers their choice.',
      'Photos are black and white and bloom into colour on hover. If an image fails to load, a designed fallback frame appears, so the page never looks broken.',
      'Alongside the code: a PRD with audiences, success metrics (30+ booking requests a month, Lighthouse 90+) and a pitch guide with packages and answers to likely objections.',
    ],
    look: {
      intro: 'Quiet luxury: a giant thin wordmark, big serif headlines with one italic rose-taupe word, black-and-white photography and lots of space.',
      fonts: ['Italiana (wordmark)', 'Cormorant Garamond (headlines)', 'Jost (body and labels)'],
      palette: [
        { name: 'bone', hex: '#F5F3EF' },
        { name: 'ink', hex: '#171514' },
        { name: 'rose taupe', hex: '#9E776B' },
        { name: 'night', hex: '#121110' },
        { name: 'blush', hex: '#C9A093' },
      ],
    },
    features: [
      'The Seven Wonders menu, numbered I to VII',
      'One-tap WhatsApp booking with a pre-filled message',
      'One-tap directions to the studio',
      'Warm, Light and Dark colour modes',
      'Respects reduced-motion settings',
    ],
    shots: [
      { src: asset('/work/seven-wonders-desktop.webp'), alt: '7 Wonders Studio homepage: “Seven ways to feel wonderful.” beside a black and white portrait', kind: 'desktop' },
      { src: asset('/work/seven-wonders-phone.webp'), alt: '7 Wonders Studio on a phone', kind: 'phone' },
    ],
    learned: 'A pitch is a design problem too. Deciding what the owner should feel in the first five seconds on their own phone shaped the site more than any style guide.',
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
