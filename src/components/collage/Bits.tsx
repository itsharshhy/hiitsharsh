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

/** A torn paper edge. Put it at the top of a section; `color` is that section's paper. */
export function Torn({ color, seed = 3, height = 34, className = '' }: { color: string; seed?: number; height?: number; className?: string }) {
  const d = useMemo(() => {
    const r = rand(seed);
    let p = `M0 ${height}`;
    for (let x = 0; x <= 100; x += 1.6 + r() * 2.4) p += ` L${x.toFixed(2)} ${(height * 0.25 + r() * height * 0.6).toFixed(2)}`;
    return `${p} L100 ${height * 0.5} L100 ${height} Z`;
  }, [seed, height]);
  return (
    <svg className={`torn ${className}`} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none" aria-hidden="true" style={{ height }}>
      <path d={d} fill="rgba(0,0,0,.12)" transform="translate(0 -2)" />
      <path d={d} fill={color} />
    </svg>
  );
}

/** A hand-drawn loop that draws itself around whatever it wraps. */
export function Scribble({ children, color = 'var(--tomato)', className = '' }: { children: ReactNode; color?: string; className?: string }) {
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
  tone?: 'paper' | 'yellow' | 'blue' | 'kraft';
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

/** Big headline where every letter drops in on its own and jiggles on hover. */
export function Kinetic({ text, className = '', delay = 0, as: Tag = 'span' }: { text: string; className?: string; delay?: number; as?: 'span' | 'h1' | 'h2' }) {
  const words = useMemo(() => {
    const r = rand(text.length * 7 + 1);
    let n = 0;
    return text.split(' ').map((w) => w.split('').map((c) => ({ c, i: n++, rot: (r() - 0.5) * 50, tilt: (r() - 0.5) * 6 })));
  }, [text]);
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
              whileInView={{ y: 0, opacity: 1, rotate: l.tilt }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 300, damping: 14, delay: delay + l.i * 0.035 }}
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
