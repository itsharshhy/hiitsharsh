import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useId, useState } from 'react';
import { asset } from '../content/asset';

// Pixel-art me (public/harsh.webp, background removed), with life added on top in SVG:
// a one-pixel bob, blinks, a glint across the glasses, and a "hi!" when poked.
// Coordinates are in the image's own pixels (609 x 696).

const SKIN = '#fde3d2';
const INK = '#07080a';
const lenses = [
  { x: 182, w: 80, lid: [195, 250] },
  { x: 340, w: 88, lid: [355, 415] },
];

export default function Avatar({ size = 'big', className = '' }: { size?: 'big' | 'small'; className?: string }) {
  const [blink, setBlink] = useState(false);
  const [hi, setHi] = useState(false);
  const clip = useId();

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 160);
        loop();
      }, 2200 + Math.random() * 3200);
    };
    loop();
    return () => clearTimeout(t);
  }, []);

  const poke = () => {
    setHi(true);
    setTimeout(() => setHi(false), 1600);
  };

  return (
    <svg
      viewBox="-20 -90 649 806"
      className={`avatar avatar--${size} ${className}`}
      role="img"
      aria-label="Harsh as pixel art: messy black hair, round glasses, black hoodie"
      onClick={poke}
      onPointerEnter={poke}
    >
      <defs>
        <clipPath id={clip}>
          {lenses.map((l) => (
            <rect key={l.x} x={l.x} y={286} width={l.w} height={52} />
          ))}
        </clipPath>
      </defs>
      <g className="avatar__bob">
        <image href={asset('harsh.webp')} width="609" height="696" style={{ imageRendering: 'pixelated' }} />
        {blink &&
          lenses.map((l) => (
            <g key={l.x}>
              <rect x={l.x} y={296} width={l.w} height={38} fill={SKIN} />
              <rect x={l.lid[0]} y={316} width={l.lid[1] - l.lid[0]} height={10} fill={INK} />
            </g>
          ))}
        <g clipPath={`url(#${clip})`}>
          <motion.rect
            y={270}
            width={18}
            height={90}
            fill="#fff"
            opacity={0.75}
            transform="skewX(-25)"
            initial={{ x: 120 }}
            animate={{ x: [120, 560] }}
            transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 3.5, ease: 'easeInOut' }}
          />
        </g>
      </g>
      <AnimatePresence>
        {hi && (
          <motion.g
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ transformOrigin: '500px 0px', transformBox: 'view-box' } as React.CSSProperties}
          >
            <rect x={430} y={-80} width={170} height={96} fill="#fff" stroke={INK} strokeWidth="8" />
            <rect x={450} y={12} width={30} height={30} fill="#fff" stroke={INK} strokeWidth="8" />
            <rect x={446} y={8} width={38} height={10} fill="#fff" />
            <text x={515} y={-12} textAnchor="middle" fontSize="64" fontFamily="'DM Mono', monospace" fontWeight="500" fill={INK}>
              hi!
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
