import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useId, useRef, useState } from 'react';
import { look } from '../content/avatar';

// An illustrated, animated stand-in for a photo. It breathes, blinks, follows your
// cursor with its eyes and waves when you hover or tap it. Colours and hair live in
// content/avatar.ts so the character can be tuned to match the real person.

export default function Avatar({ size = 'big' }: { size?: 'big' | 'small' }) {
  const ref = useRef<SVGSVGElement>(null);
  const [eye, setEye] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);
  const arm = useAnimationControls();
  const clip = useId();

  // Eyes follow the pointer.
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const box = ref.current?.getBoundingClientRect();
      if (!box) return;
      const cx = box.left + box.width / 2;
      const cy = box.top + box.height * 0.38;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d = Math.hypot(dx, dy) || 1;
      const k = Math.min(1, d / 300);
      setEye({ x: (dx / d) * 4.5 * k, y: (dy / d) * 3.5 * k });
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  // Blink every few seconds, at slightly random times so it feels alive.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 140);
        loop();
      }, 2200 + Math.random() * 2800);
    };
    loop();
    return () => clearTimeout(t);
  }, []);

  const wave = () =>
    arm.start({ rotate: [0, -22, 6, -22, 6, 0], transition: { duration: 1.3, ease: 'easeInOut' } });

  // Say hi once when it first appears.
  useEffect(() => {
    const t = setTimeout(wave, 900);
    return () => clearTimeout(t);
  }, []);

  const eyeRy = blink ? 0.6 : 9;

  return (
    <motion.svg
      ref={ref}
      viewBox="0 0 300 340"
      className={`avatar avatar--${size}`}
      role="img"
      aria-label={`An illustrated, animated version of ${look.name}, waving hello`}
      onPointerEnter={wave}
      onClick={wave}
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* body */}
      <clipPath id={clip}>
        <path d="M40 340 C 44 270, 90 238, 150 236 C 210 238, 256 270, 260 340Z" />
      </clipPath>
      <path d="M40 340 C 44 270, 90 238, 150 236 C 210 238, 256 270, 260 340Z" fill={look.shirt} />
      {look.stripes &&
        [256, 274, 292, 310, 328].map((y) => (
          <path key={y} d={`M30 ${y} L270 ${y}`} stroke={look.stripe} strokeWidth="8" clipPath={`url(#${clip})`} />
        ))}
      <path d="M128 236 L150 262 L172 236" fill={look.skin} />

      {/* waving arm */}
      <motion.g animate={arm} style={{ originX: '232px', originY: '286px' }}>
        <path d="M232 290 C 250 250, 262 220, 266 186" stroke={look.shirt} strokeWidth="30" strokeLinecap="round" fill="none" />
        <circle cx="268" cy="172" r="17" fill={look.skin} />
        <path d="M258 158 L256 146 M266 155 L266 142 M274 157 L277 145" stroke={look.skin} strokeWidth="7" strokeLinecap="round" />
      </motion.g>

      {/* neck & head */}
      <rect x="132" y="196" width="36" height="48" rx="14" fill={look.skinShade} />
      <ellipse cx="88" cy="140" rx="13" ry="18" fill={look.skin} />
      <ellipse cx="212" cy="140" rx="13" ry="18" fill={look.skin} />
      <ellipse cx="150" cy="134" rx="64" ry="76" fill={look.skin} />

      {/* hair */}
      <path d={hairPaths[look.hair]} fill={look.hairColor} />

      {/* brows */}
      <path d="M110 112 Q124 104 138 110" stroke={look.hairColor} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M162 110 Q176 104 190 112" stroke={look.hairColor} strokeWidth="5" strokeLinecap="round" fill="none" />

      {/* eyes */}
      {[124, 176].map((x) => (
        <g key={x}>
          <ellipse cx={x} cy="134" rx="10" ry={eyeRy} fill="#fff" />
          {!blink && <circle cx={x + eye.x} cy={134 + eye.y} r="5.5" fill="#1d1a18" />}
          {!blink && <circle cx={x + eye.x + 2} cy={131 + eye.y} r="1.8" fill="#fff" />}
        </g>
      ))}

      {look.glasses && (
        <g stroke={look.glassesColor} strokeWidth="4" fill="none">
          <rect x="104" y="118" width="40" height="32" rx="12" />
          <rect x="156" y="118" width="40" height="32" rx="12" />
          <path d="M144 132 Q150 127 156 132" />
        </g>
      )}

      {/* nose, mouth, cheeks */}
      <path d="M150 140 Q146 156 152 160" stroke={look.skinShade} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M130 174 Q150 192 170 174" stroke="#7a3b32" strokeWidth="4.5" strokeLinecap="round" fill="#b5544b" />
      <motion.g animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2.4, repeat: Infinity }} style={{ originX: '150px', originY: '165px' }}>
        <path d="M106 166 C 98 158 104 150 110 156 C 116 150 122 158 114 166 L110 170Z" fill="#f28fae" opacity="0.85" />
        <path d="M186 166 C 178 158 184 150 190 156 C 196 150 202 158 194 166 L190 170Z" fill="#f28fae" opacity="0.85" />
      </motion.g>
    </motion.svg>
  );
}

const hairPaths: Record<string, string> = {
  short:
    'M86 132 C 78 70, 118 46, 156 50 C 196 52, 226 78, 216 132 C 210 112, 204 96, 190 90 C 172 100, 140 104, 112 96 C 100 104, 92 116, 86 132Z',
  fluffy:
    'M84 136 C 66 96, 86 52, 124 46 C 136 30, 176 32, 190 46 C 228 54, 236 100, 216 136 C 214 112, 206 98, 196 92 C 186 104, 160 98, 150 88 C 136 102, 110 104, 102 98 C 94 108, 88 120, 84 136Z',
  long:
    'M80 220 C 64 160, 70 72, 118 50 C 160 32, 214 50, 226 110 C 232 150, 228 196, 222 222 C 214 190, 214 150, 208 112 C 190 96, 150 96, 122 82 C 104 98, 94 120, 92 160 C 90 186, 88 206, 80 220Z',
  bun:
    'M150 8 C 128 8, 122 34, 136 46 C 104 50, 82 76, 86 132 C 94 112, 104 96, 118 92 C 140 100, 172 100, 186 90 C 200 98, 210 114, 216 132 C 220 78, 196 50, 164 46 C 178 34, 172 8, 150 8Z',
};
