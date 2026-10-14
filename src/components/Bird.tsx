import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';

// A little cream dove. Its wings flap on a loop; `carrying` dangles two strings
// from its feet so it can pick up the envelope.
export default function Bird({ carrying = false, className = '', style }: { carrying?: boolean; className?: string; style?: CSSProperties }) {
  const wing = (dir: 1 | -1) => (
    <motion.path
      d={dir === 1 ? 'M60 46 C 70 20, 96 6, 118 10 C 104 22, 92 38, 72 52 Z' : 'M56 46 C 44 22, 20 10, 2 16 C 16 26, 30 40, 48 52 Z'}
      fill="#fff3d5"
      stroke="#4d694e"
      strokeWidth="3"
      strokeLinejoin="round"
      animate={{ scaleY: [1, -0.6, 1] }}
      transition={{ duration: 0.32, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: '58px 48px', transformBox: 'view-box' } as CSSProperties}
    />
  );
  return (
    <svg className={`bird ${className}`} style={style} viewBox="0 0 120 110" aria-hidden="true">
      {carrying && (
        <g stroke="#4d694e" strokeWidth="2" strokeLinecap="round">
          <path d="M52 66 L30 108" />
          <path d="M64 66 L90 108" />
        </g>
      )}
      {wing(-1)}
      {/* body + tail */}
      <path d="M30 56 C 36 40, 66 36, 84 46 C 92 50, 94 58, 88 64 C 76 74, 46 74, 30 66 L 14 72 L 20 60 Z" fill="#fff3d5" stroke="#4d694e" strokeWidth="3" strokeLinejoin="round" />
      {/* head */}
      <circle cx="88" cy="46" r="11" fill="#fff3d5" stroke="#4d694e" strokeWidth="3" />
      <circle cx="91" cy="44" r="2.2" fill="#2b3a2c" />
      <path d="M98 47 L108 50 L98 52 Z" fill="#d9a441" stroke="#4d694e" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="86" cy="51" r="2.6" fill="#f2b8a8" opacity="0.7" />
      {wing(1)}
      {/* feet */}
      <path d="M52 70 l0 -4 M64 70 l0 -4" stroke="#d9a441" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
