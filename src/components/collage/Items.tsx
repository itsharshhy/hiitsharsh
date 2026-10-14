// Hand-drawn (well, hand-coded) scrapbook objects. All SVG, so they stay crisp at any size
// and weigh almost nothing compared to photos.

const hand = "'Patrick Hand', cursive";
const mono = "'DM Mono', monospace";
const serif = "'Instrument Serif', serif";

export function Beads({ word }: { word: string }) {
  const letters = word.toUpperCase().slice(0, 6).split('');
  const row2 = ['heart', 'star', 'heart', 'Y'] as const;
  return (
    <svg viewBox="0 0 330 150" aria-hidden="true">
      <defs>
        <radialGradient id="bead" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.7" stopColor="#ece8e1" />
          <stop offset="1" stopColor="#bdb6ac" />
        </radialGradient>
      </defs>
      <path d="M8 40 Q 165 70 322 50" stroke="#d9cfc0" strokeWidth="1.5" fill="none" />
      {letters.map((l, i) => {
        const x = 34 + i * 54;
        const y = 44 + Math.sin(i * 1.3) * 7;
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${(i % 2 ? 1 : -1) * 8})`}>
            <circle r="25" fill="url(#bead)" />
            <text y="9" textAnchor="middle" fontFamily={mono} fontWeight="500" fontSize="26" fill="#1b1a19">{l}</text>
          </g>
        );
      })}
      <path d="M60 112 Q 170 128 290 106" stroke="#d9cfc0" strokeWidth="1.5" fill="none" />
      {row2.map((s, i) => {
        const x = 78 + i * 58;
        const y = 114 + Math.cos(i) * 4;
        return (
          <g key={i} transform={`translate(${x} ${y}) rotate(${i * 7 - 10})`}>
            <circle r="23" fill="url(#bead)" />
            {s === 'heart' && <path d="M0 9 C -16 -2 -10 -14 0 -6 C 10 -14 16 -2 0 9Z" fill="#1b1a19" />}
            {s === 'star' && <path d="M0 -11 L3 -3 L11 -3 L5 2 L7 10 L0 5 L-7 10 L-5 2 L-11 -3 L-3 -3Z" fill="#1b1a19" />}
            {s === 'Y' && <text y="8" textAnchor="middle" fontFamily={mono} fontWeight="500" fontSize="24" fill="#1b1a19">Y</text>}
          </g>
        );
      })}
    </svg>
  );
}

export function StickyNote() {
  return (
    <div className="sticky-note">
      <span>to do:</span>
      <span className="sticky-note__item">☑ make the internet softer</span>
      <span className="sticky-note__item">☐ drink water</span>
      <span className="sticky-note__item">☐ more cherries</span>
    </div>
  );
}

export function Envelope() {
  return (
    <svg viewBox="0 0 240 200" aria-hidden="true">
      <path d="M20 80 L120 20 L220 80Z" fill="#7d9a7b" />
      <g transform="rotate(-4 120 100)">
        <rect x="58" y="0" width="140" height="130" rx="3" fill="#f7f4ee" />
        <rect x="58" y="0" width="140" height="130" rx="3" fill="none" stroke="#e3ddd1" />
        <text x="128" y="34" textAnchor="middle" fontFamily={hand} fontSize="24" fill="#3a3530">say hi!</text>
        <text x="128" y="58" textAnchor="middle" fontFamily={hand} fontSize="15" fill="#8a8178">(open me)</text>
      </g>
      <path d="M20 80 L220 80 L220 190 L20 190Z" fill="#a9bfa3" />
      <path d="M20 80 L120 150 L220 80 L220 190 L20 190Z" fill="#d3dfc9" />
      <path d="M20 190 L105 128 M220 190 L135 128" stroke="#8fa98d" strokeWidth="2" />
      <circle cx="120" cy="140" r="12" fill="#4d694e" />
      <text x="120" y="145" textAnchor="middle" fontFamily={serif} fontSize="14" fill="#fff3d5">H</text>
    </svg>
  );
}

export function RedString() {
  return (
    <svg viewBox="0 0 1000 140" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M330 70 C 380 20, 420 110, 470 80 C 520 50, 560 30, 640 60 C 720 90, 760 40, 800 70 C 840 100, 880 20, 830 0"
        stroke="#fff3d5"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {[ [470, 80], [780, 62] ].map(([x, y], i) => (
        <g key={i} transform={`translate(${x} ${y})`} stroke="#fff3d5" strokeWidth="3" fill="none" strokeLinecap="round">
          <path d="M0 0 C -30 -25, -40 10, 0 0 C 30 -25, 40 10, 0 0" />
          <path d="M0 0 L -14 26 M0 0 L 12 28" />
        </g>
      ))}
    </svg>
  );
}

export function Camera() {
  return (
    <svg viewBox="0 0 280 190" aria-hidden="true">
      <defs>
        <linearGradient id="cam" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e3ebd6" />
          <stop offset="1" stopColor="#8fa98d" />
        </linearGradient>
        <radialGradient id="lens" cx="40%" cy="35%" r="70%">
          <stop offset="0" stopColor="#6b7a8f" />
          <stop offset="0.5" stopColor="#1e2430" />
          <stop offset="1" stopColor="#05070a" />
        </radialGradient>
      </defs>
      <rect x="12" y="28" width="256" height="150" rx="18" fill="url(#cam)" />
      <rect x="12" y="28" width="256" height="150" rx="18" fill="none" stroke="#6d8a6b" strokeWidth="2" />
      <rect x="40" y="16" width="56" height="18" rx="5" fill="#c9c3c8" />
      <rect x="190" y="18" width="40" height="14" rx="4" fill="#e7e2e6" />
      <rect x="62" y="44" width="58" height="26" rx="4" fill="#dcdcdc" stroke="#a9a2a6" />
      <circle cx="175" cy="105" r="56" fill="#e9e4e8" stroke="#b9a9b2" strokeWidth="3" />
      <circle cx="175" cy="105" r="44" fill="#cfc8ce" />
      <circle cx="175" cy="105" r="34" fill="url(#lens)" />
      <circle cx="163" cy="93" r="8" fill="#ffffff" opacity="0.45" />
      <text x="175" y="60" textAnchor="middle" fontFamily={mono} fontSize="7" fill="#7b6d74">HY · 35mm · 1:2.8</text>
      {/* stickers */}
      <g transform="translate(46 112) rotate(-10)">
        <circle r="22" fill="#fff" />
        <path d="M0 12 C -22 -2 -12 -20 0 -8 C 12 -20 22 -2 0 12Z" fill="#4d694e" />
      </g>
      <g transform="translate(92 92) rotate(12)">
        <rect x="-18" y="-16" width="36" height="32" rx="8" fill="#fff" />
        <path d="M-12 8 L-12 -10 L-5 -3 L5 -3 L12 -10 L12 8 Q0 16 -12 8Z" fill="#f5b041" />
        <circle cx="-5" cy="1" r="2" fill="#222" />
        <circle cx="5" cy="1" r="2" fill="#222" />
      </g>
      <g transform="translate(95 150) rotate(-6)">
        <path d="M0 -14 L4 -4 L14 -4 L6 3 L9 13 L0 7 L-9 13 L-6 3 L-14 -4 L-4 -4Z" fill="#fff" stroke="#fff" strokeWidth="6" strokeLinejoin="round" />
        <path d="M0 -14 L4 -4 L14 -4 L6 3 L9 13 L0 7 L-9 13 L-6 3 L-14 -4 L-4 -4Z" fill="#7cc4a0" />
      </g>
      <circle cx="248" cy="48" r="5" fill="#9b8f95" />
    </svg>
  );
}

export function VinylSleeve({ title }: { title: string }) {
  const words = title.toUpperCase().split(' ');
  return (
    <svg viewBox="0 0 300 300" aria-hidden="true">
      <g>
        <circle cx="190" cy="100" r="96" fill="#111" stroke="#4a4642" strokeWidth="2" />
        {[80, 66, 52].map((r) => (
          <circle key={r} cx="190" cy="100" r={r} fill="none" stroke="#2a2a2a" strokeWidth="1.5" />
        ))}
        <circle cx="190" cy="100" r="30" fill="#8fa98d" />
        <circle cx="190" cy="100" r="4" fill="#111" />
        <path d="M130 40 A 90 90 0 0 1 250 40" stroke="#ffffff" strokeOpacity="0.22" strokeWidth="6" fill="none" />
      </g>
      <g transform="rotate(-4 150 190)">
        <rect x="30" y="80" width="230" height="210" fill="#fff3d5" />
        {words.map((w, i) => (
          <text
            key={i}
            x="48"
            y={132 + i * 46}
            fontFamily="'Instrument Sans Variable', sans-serif"
            fontWeight="800"
            fontSize="44"
            letterSpacing="-1"
            fill="#4d694e"
            transform={`rotate(${i % 2 ? 2 : -2} 48 ${132 + i * 46})`}
          >
            {w}
          </text>
        ))}
        {/* little flower doodle */}
        <g transform="translate(222 254)" fill="#4d694e">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse key={a} rx="7" ry="13" transform={`rotate(${a}) translate(0 -12)`} />
          ))}
          <circle r="6" fill="#fff3d5" />
        </g>
        <rect x="44" y="262" width="62" height="16" fill="#fff" />
        <text x="48" y="274" fontFamily={mono} fontSize="9" fill="#222">SIDE A · 2026</text>
      </g>
    </svg>
  );
}

export function Tickets() {
  return (
    <svg viewBox="0 0 300 220" aria-hidden="true">
      <g transform="rotate(8 200 140)">
        <rect x="110" y="70" width="180" height="130" rx="6" fill="#c2d3bb" />
        <rect x="118" y="78" width="164" height="114" rx="3" fill="none" stroke="#6d8a6b" strokeDasharray="3 3" />
        <text x="130" y="104" fontFamily={mono} fontSize="11" fill="#2b3a2c">ROW H · SEAT 7</text>
        <text x="130" y="140" fontFamily={serif} fontSize="34" fill="#2b3a2c">PG-13</text>
        <text x="130" y="160" fontFamily={mono} fontSize="9" fill="#2b3a2c">ADMIT ONE · NO REFUNDS</text>
        {Array.from({ length: 22 }).map((_, i) => (
          <rect key={i} x={130 + i * 6} y="168" width={i % 3 ? 2 : 3.5} height="16" fill="#2b3a2c" />
        ))}
      </g>
      <g transform="rotate(-6 100 90)">
        <rect x="10" y="30" width="200" height="120" rx="8" fill="#fbf8f2" />
        <path d="M10 38 Q10 30 18 30 L202 30 Q210 30 210 38 L210 62 L10 62Z" fill="#4d694e" />
        <text x="22" y="52" fontFamily={mono} fontSize="13" fill="#fff" fontWeight="500">7 WONDERS STUDIO</text>
        <text x="22" y="82" fontFamily={mono} fontSize="9" fill="#555">FROM</text>
        <text x="22" y="98" fontFamily={mono} fontSize="13" fill="#222">HILL ROAD</text>
        <text x="118" y="82" fontFamily={mono} fontSize="9" fill="#555">TO</text>
        <text x="118" y="98" fontFamily={mono} fontSize="13" fill="#222">BANDRA W.</text>
        <text x="22" y="128" fontFamily={serif} fontSize="24" fill="#222">ADMIT ONE</text>
        <text x="150" y="134" fontFamily={mono} fontSize="9" fill="#4d694e">No. 007</text>
      </g>
    </svg>
  );
}

export function Cherries() {
  return (
    <svg viewBox="0 0 120 150" aria-hidden="true">
      <defs>
        <radialGradient id="cherry" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#ff6b6b" />
          <stop offset="0.6" stopColor="#c8102e" />
          <stop offset="1" stopColor="#6d0614" />
        </radialGradient>
      </defs>
      <path d="M62 14 C 50 50, 36 70, 34 100 M62 14 C 70 50, 84 74, 88 104" stroke="#6d8a3a" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M62 14 C 40 -2, 14 10, 6 34 C 30 40, 52 30, 62 14Z" fill="#7fb03f" />
      <path d="M62 14 C 40 14, 22 24, 6 34" stroke="#5a8a2a" strokeWidth="1.5" fill="none" />
      <circle cx="34" cy="116" r="24" fill="url(#cherry)" />
      <circle cx="88" cy="120" r="24" fill="url(#cherry)" />
      <ellipse cx="26" cy="106" rx="6" ry="4" fill="#fff" opacity="0.55" />
      <ellipse cx="80" cy="110" rx="6" ry="4" fill="#fff" opacity="0.55" />
    </svg>
  );
}

export function PressedFlower() {
  return (
    <svg viewBox="0 0 200 260" aria-hidden="true">
      <path d="M100 120 C 104 170, 92 210, 100 258" stroke="#6f6a3b" strokeWidth="3" fill="none" />
      <path d="M100 200 C 120 186, 140 190, 150 176 C 130 172, 112 182, 100 200Z" fill="#8b8a52" opacity="0.8" />
      {Array.from({ length: 11 }).map((_, i) => {
        const a = (i / 11) * 360;
        return (
          <path
            key={i}
            d="M0 0 C 14 -16, 22 -40, 8 -70 C 2 -76, -6 -74, -10 -66 C -22 -40, -14 -16, 0 0Z"
            fill={i % 2 ? '#fff3d5' : '#f1e2bb'}
            stroke="#c9b98f"
            strokeWidth="1"
            transform={`translate(100 100) rotate(${a + (i % 3) * 4})`}
          />
        );
      })}
      <circle cx="100" cy="100" r="18" fill="#d9a441" />
      <circle cx="100" cy="100" r="12" fill="#b9862c" />
      {Array.from({ length: 10 }).map((_, i) => (
        <circle key={i} cx={100 + Math.cos(i) * 9} cy={100 + Math.sin(i * 1.7) * 9} r="1.6" fill="#fff3d5" />
      ))}
    </svg>
  );
}

export function ForgetMeNots({ tone = 'blue' }: { tone?: 'blue' | 'violet' }) {
  const fill = tone === 'blue' ? '#fff3d5' : '#c2d3bb';
  const dark = tone === 'blue' ? '#c9b98f' : '#6d8a6b';
  const flowers = [
    [50, 50, 1],
    [110, 90, 0.75],
    [40, 125, 0.6],
  ] as const;
  return (
    <svg viewBox="0 0 160 160" aria-hidden="true">
      {flowers.map(([x, y, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${s}) rotate(${i * 20})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <path key={a} d="M0 0 C 12 -8, 20 -30, 0 -42 C -20 -30, -12 -8, 0 0Z" fill={fill} stroke={dark} strokeWidth="1.2" transform={`rotate(${a})`} />
          ))}
          <circle r="7" fill="#f6e7a6" />
          <circle r="3" fill="#e6b84a" />
        </g>
      ))}
    </svg>
  );
}

export function Crossword() {
  // 9x9 grid. Letters spell PEBBLE (across), PLANT (down) and WONDERS (across).
  const size = 9;
  const letters: Record<string, string> = {};
  'PEBBLE'.split('').forEach((c, i) => (letters[`1,${1 + i}`] = c));
  'PLANT'.split('').forEach((c, i) => (letters[`${1 + i},1`] = c));
  'WONDERS'.split('').forEach((c, i) => (letters[`7,${1 + i}`] = c));
  const black = new Set(['0,3', '0,7', '2,3', '2,5', '2,8', '3,3', '3,6', '4,4', '4,7', '5,2', '5,6', '6,0', '6,4', '6,8', '8,2', '8,5', '3,0', '1,8', '5,8']);
  const c = 22;
  return (
    <svg viewBox={`0 0 ${size * c + 16} ${size * c + 16}`} aria-hidden="true">
      <rect width={size * c + 16} height={size * c + 16} rx="6" fill="#f1e6cf" />
      <g transform="translate(8 8)">
        {Array.from({ length: size * size }).map((_, i) => {
          const r = Math.floor(i / size);
          const col = i % size;
          const k = `${r},${col}`;
          return (
            <g key={k}>
              <rect x={col * c} y={r * c} width={c} height={c} fill={black.has(k) ? '#2a2622' : '#fbf6ea'} stroke="#2a2622" strokeWidth="0.8" />
              {letters[k] && (
                <text x={col * c + c / 2} y={r * c + c - 5} textAnchor="middle" fontFamily={hand} fontSize="16" fill="#4d694e">
                  {letters[k]}
                </text>
              )}
            </g>
          );
        })}
        <text x="2" y="9" fontFamily={mono} fontSize="6" fill="#555">1</text>
      </g>
    </svg>
  );
}

export function PebbleDish() {
  return (
    <svg viewBox="0 0 260 200" aria-hidden="true">
      <path
        d="M30 70 C 20 30, 90 10, 140 24 C 200 40, 250 50, 246 110 C 242 170, 170 196, 110 186 C 50 176, 40 120, 30 70Z"
        fill="#f4efe4"
        stroke="#d9cfbd"
        strokeWidth="3"
      />
      <path
        d="M48 76 C 42 44, 96 30, 138 40 C 190 54, 228 62, 226 108 C 224 156, 166 176, 114 168 C 66 160, 56 118, 48 76Z"
        fill="#fbf8f1"
      />
      {/* painted figure */}
      <path d="M80 90 C 100 60, 150 70, 170 100 C 190 130, 150 150, 120 140 C 90 130, 70 110, 80 90Z" fill="#4d694e" opacity="0.85" />
      <circle cx="176" cy="74" r="12" fill="#4d694e" opacity="0.85" />
      <path d="M190 120 C 200 110, 210 130, 200 140" stroke="#4d9a5a" strokeWidth="6" fill="none" strokeLinecap="round" />
      <path d="M70 140 C 64 128, 80 120, 84 132" stroke="#8fa98d" strokeWidth="6" fill="none" strokeLinecap="round" />
      {/* the pebbles */}
      <ellipse cx="120" cy="104" rx="24" ry="16" fill="#93ab98" transform="rotate(-12 120 104)" />
      <ellipse cx="156" cy="124" rx="18" ry="13" fill="#dcc7a9" transform="rotate(18 156 124)" />
      <ellipse cx="104" cy="134" rx="15" ry="11" fill="#b6c9cc" />
      <ellipse cx="114" cy="98" rx="8" ry="4" fill="#fff" opacity="0.35" transform="rotate(-12 114 98)" />
    </svg>
  );
}
