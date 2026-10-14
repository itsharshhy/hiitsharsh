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
