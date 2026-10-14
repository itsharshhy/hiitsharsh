import { motion } from 'framer-motion';
import { useMemo, type CSSProperties, type ReactNode } from 'react';

// Small collage building blocks shared by the About and Projects pages.

// A deterministic wobble so torn edges look random but stay the same on every render.
const rand = (seed: number) => {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
};

/** A torn paper edge. Put it at the top of a section; `color` is that section's paper.
 *  `under` adds a second torn strip (e.g. blue paper) peeking out beneath the tear. */
export function Torn({ color, under, seed = 3, height = 40, className = '' }: { color: string; under?: string; seed?: number; height?: number; className?: string }) {
  const [d, d2] = useMemo(() => {
    const edge = (sd: number, lo: number, hi: number) => {
      const r = rand(sd);
      let p = `M0 ${height}`;
      for (let x = 0; x <= 100; x += 0.8 + r() * 1.8) p += ` L${x.toFixed(2)} ${(height * lo + r() * height * (hi - lo)).toFixed(2)}`;
      return `${p} L100 ${height * 0.5} L100 ${height} Z`;
    };
    return [edge(seed, 0.45, 0.85), edge(seed + 5, 0.15, 0.6)];
  }, [seed, height]);
  return (
    <svg className={`torn ${className}`} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" aria-hidden="true" style={{ height }}>
      {under && <path d={d2} fill={under} />}
      <path d={d} fill="rgba(0,0,0,.10)" transform="translate(0 -1.5)" />
      <path d={d} fill="#fffdf8" transform="translate(0 -0.8)" />
      <path d={d} fill={color} />
    </svg>
  );
}

/** A hand-drawn loop that draws itself around whatever it wraps. */
export function Scribble({ children, color = 'var(--pen)', className = '' }: { children: ReactNode; color?: string; className?: string }) {
  return (
    <span className={`scribble-wrap ${className}`}>
      {children}
      <svg viewBox="0 0 200 80" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M30 14 C 80 2, 170 4, 190 30 C 204 56, 150 76, 92 74 C 30 72, 2 58, 8 36 C 14 16, 60 8, 120 10"
          stroke={color}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.3, ease: 'easeInOut' }}
        />
      </svg>
    </span>
  );
}

/** A loose pen arrow. */
export function Arrow({ className = '', color = 'currentColor', style }: { className?: string; color?: string; style?: CSSProperties }) {
  return (
    <svg className={`arrow ${className}`} viewBox="0 0 120 80" aria-hidden="true" style={style}>
      <motion.path
        d="M8 10 C 40 6, 80 20, 104 62 M104 62 L86 56 M104 62 L106 44"
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
    </svg>
  );
}

/** A handwritten scrap of paper stuck on with tape. */
export function Note({ children, tilt = -3, tone = 'paper', className = '', style, delay = 0 }: {
  children: ReactNode;
  tilt?: number;
  tone?: 'paper' | 'lemon' | 'lilac' | 'pink';
  className?: string;
  style?: CSSProperties;
  delay?: number;
}) {
  return (
    <motion.span
      className={`note note--${tone} ${className}`}
      style={style}
      initial={{ opacity: 0, scale: 0.6, rotate: tilt - 14 }}
      whileInView={{ opacity: 1, scale: 1, rotate: tilt }}
      viewport={{ once: true }}
      transition={{ type: 'spring', stiffness: 260, damping: 15, delay }}
      whileHover={{ rotate: 0, scale: 1.06 }}
    >
      {children}
    </motion.span>
  );
}

/** Big headline where every letter drops in on its own, sits a little out of line
 *  (like letters cut from a magazine) and jiggles on hover. Words never break apart. */
export function Kinetic({ text, className = '', delay = 0, as: Tag = 'span', loose = true }: {
  text: string;
  className?: string;
  delay?: number;
  as?: 'span' | 'h1' | 'h2';
  loose?: boolean;
}) {
  const words = useMemo(() => {
    const r = rand(text.length * 7 + 1);
    let n = 0;
    return text.split(' ').map((w) =>
      w.split('').map((c) => ({
        c,
        i: n++,
        rot: (r() - 0.5) * 50,
        tilt: loose ? (r() - 0.5) * 4 : 0,
        dy: loose ? (r() - 0.5) * 0.05 : 0,
      })),
    );
  }, [text, loose]);
  return (
    <Tag className={`kinetic ${className}`}>
      <span className="sr-only">{text}</span>
      {words.map((w, wi) => (
        <span key={wi} className="kinetic__w" aria-hidden="true">
          {w.map((l) => (
            <motion.span
              key={l.i}
              className="kinetic__l"
              initial={{ y: '-0.8em', opacity: 0, rotate: l.rot }}
              whileInView={{ y: `${l.dy}em`, opacity: 1, rotate: l.tilt }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 14, delay: delay + l.i * 0.03 }}
              whileHover={{ y: '-0.08em', rotate: l.rot / 3 }}
            >
              {l.c}
            </motion.span>
          ))}
        </span>
      ))}
    </Tag>
  );
}

/** A loose black-ink flower that draws itself, stroke by stroke. */
export function InkFlower({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const strokes = [
    'M100 270 C 98 220, 104 180, 100 120',
    'M100 205 C 70 190, 46 196, 22 226 C 50 222, 78 214, 100 205',
    'M101 180 C 130 160, 160 166, 182 146 C 156 144, 126 156, 101 180',
    'M100 120 C 70 112, 52 84, 60 46 C 78 62, 92 86, 100 120',
    'M100 120 C 128 110, 146 82, 140 44 C 122 60, 108 86, 100 120',
    'M100 118 C 92 80, 94 48, 102 22 C 112 48, 110 82, 100 118',
    'M62 50 C 70 64, 72 80, 86 96 M138 48 C 128 66, 126 82, 114 98',
    'M96 30 C 98 60, 100 90, 99 116',
  ];
  return (
    <svg className={`ink-flower ${className}`} style={style} viewBox="0 0 200 280" aria-hidden="true">
      {strokes.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth={i < 3 ? 2.6 : 3.4}
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 + i * 0.18, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}

/** A strip of tape with text scrolling along it forever. */
export function Marquee({ items, className = '' }: { items: string[]; className?: string }) {
  const row = [...items, ...items, ...items, ...items];
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee__track">
        {[0, 1].map((k) => (
          <span key={k}>
            {row.map((t, i) => (
              <span key={i}>
                {t} <b>✦</b>{' '}
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}
