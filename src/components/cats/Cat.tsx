import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';
import { useEffect, useId, useState, type CSSProperties } from 'react';

// Small white Persian cats, drawn in SVG. Fluff = a cluster of circles drawn twice:
// once fat in the outline colour, once on top in fur colour, so they merge into one
// fluffy silhouette with a soft edge. Click any cat and it says something.

export type Pose = 'sit' | 'loaf' | 'peek' | 'walk';

const FUR = '#fdfcf8';
const SHADE = '#ece6db';
const LINE = '#c9c0b1';
const EAR = '#f1c1b2';
const NOSE = '#e9a3a0';
const DARK = '#1b1a19';
const IRIS = { copper: '#e8922c', blue: '#5b98de', green: '#8fb04a' };

type Blob = [number, number, number];

function Fluff({ blobs, line = 3 }: { blobs: Blob[]; line?: number }) {
  return (
    <>
      {blobs.map(([x, y, r], i) => (
        <circle key={`o${i}`} cx={x} cy={y} r={r + line} fill={LINE} />
      ))}
      {blobs.map(([x, y, r], i) => (
        <circle key={`f${i}`} cx={x} cy={y} r={r} fill={i % 3 === 2 ? SHADE : FUR} />
      ))}
      {/* re-cover inner seams so only the outer edge keeps the line */}
      {blobs.map(([x, y, r], i) => (
        <circle key={`c${i}`} cx={x} cy={y} r={r * 0.82} fill={FUR} />
      ))}
    </>
  );
}

function Tail({ d, width = 13, origin, swish = 14, speed = 2.4 }: { d: string; width?: number; origin: string; swish?: number; speed?: number }) {
  return (
    <motion.g
      animate={{ rotate: [0, swish, -swish / 2, 0] }}
      transition={{ duration: speed, repeat: Infinity, ease: 'easeInOut' }}
      style={{ transformOrigin: origin, transformBox: 'view-box' } as CSSProperties}
    >
      <path d={d} stroke={LINE} strokeWidth={width + 5} strokeLinecap="round" fill="none" />
      <path d={d} stroke={FUR} strokeWidth={width} strokeLinecap="round" fill="none" />
    </motion.g>
  );
}

function Eye({ x, y, r, color, look = 0 }: { x: number; y: number; r: number; color: string; look?: number }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={color} stroke={DARK} strokeWidth="0.8" />
      <ellipse cx={x + look} cy={y} rx={r * 0.42} ry={r * 0.72} fill={DARK} />
      <circle cx={x + look + r * 0.3} cy={y - r * 0.35} r={r * 0.25} fill="#fff" />
    </g>
  );
}

function useBlink() {
  const [shut, setShut] = useState(false);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        setShut(true);
        setTimeout(() => setShut(false), 160);
        loop();
      }, 2500 + Math.random() * 4000);
    };
    loop();
    return () => clearTimeout(t);
  }, []);
  return shut;
}

function Sit({ iris }: { iris: string }) {
  const blink = useBlink();
  return (
    <svg viewBox="0 0 120 124" aria-hidden="true">
      <Tail d="M84 108 C 104 104, 114 86, 106 66" origin="84px 108px" />
      <Fluff blobs={[[60, 92, 28], [40, 100, 17], [80, 100, 17], [60, 72, 22], [45, 78, 14], [75, 78, 14], [50, 114, 8], [70, 114, 8]]} />
      {/* ears */}
      {[[40, 32, 35, 12, 52, 24], [80, 32, 85, 12, 68, 24]].map(([a, b, c, d, e, f], i) => (
        <g key={i}>
          <path d={`M${a} ${b} L${c} ${d} L${e} ${f}Z`} fill={FUR} stroke={LINE} strokeWidth="2.5" strokeLinejoin="round" />
          <path d={`M${a + (i ? -2 : 2)} ${b - 4} L${c} ${d + 6} L${e + (i ? 3 : -3)} ${f + 1}Z`} fill={EAR} />
        </g>
      ))}
      <Fluff blobs={[[60, 48, 23], [39, 54, 11], [81, 54, 11], [47, 33, 10], [73, 33, 10], [60, 30, 11]]} />
      <g style={{ transform: blink ? 'scaleY(0.1)' : 'none', transformOrigin: '60px 52px', transition: 'transform .08s' }}>
        <Eye x={50} y={52} r={6} color={iris} />
        <Eye x={70} y={52} r={6} color={iris} />
      </g>
      <path d="M57.5 59 L62.5 59 L60 62Z" fill={NOSE} />
      <path d="M56 64 Q58 66.5 60 63.5 Q62 66.5 64 64" stroke="#b5a796" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M40 60 L28 58 M40 63 L29 65 M80 60 L92 58 M80 63 L91 65" stroke={LINE} strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

function Loaf() {
  return (
    <svg viewBox="0 0 150 96" aria-hidden="true">
      <motion.g
        animate={{ scaleY: [1, 1.05, 1] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '75px 90px', transformBox: 'view-box' } as CSSProperties}
      >
        <Fluff blobs={[[78, 64, 26], [54, 66, 22], [104, 66, 22], [70, 48, 17], [94, 50, 15], [124, 72, 13], [36, 72, 13]]} />
        {[[30, 40, 26, 22, 40, 33], [56, 40, 62, 22, 48, 33]].map(([a, b, c, d, e, f], i) => (
          <path key={i} d={`M${a} ${b} L${c} ${d} L${e} ${f}Z`} fill={FUR} stroke={LINE} strokeWidth="2.5" strokeLinejoin="round" />
        ))}
        <Fluff blobs={[[43, 56, 20], [26, 62, 10], [60, 62, 9], [43, 40, 10]]} />
        <path d="M32 58 q4 3.5 8 0 M46 58 q4 3.5 8 0" stroke={DARK} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M41 63 L45 63 L43 65.5Z" fill={NOSE} />
        <path d="M128 78 C 112 92, 80 90, 62 86" stroke={LINE} strokeWidth="17" strokeLinecap="round" fill="none" />
        <path d="M128 78 C 112 92, 80 90, 62 86" stroke={FUR} strokeWidth="12" strokeLinecap="round" fill="none" />
      </motion.g>
      {[0, 1.1, 2.2].map((d, i) => (
        <motion.text
          key={i}
          x={64}
          y={30}
          fontFamily="'Patrick Hand', cursive"
          fontSize={10 + i * 3}
          fill="#8f877c"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0], x: [64, 72 + i * 4, 80 + i * 6], y: [32, 18, 4] }}
          transition={{ duration: 3.3, repeat: Infinity, delay: d }}
        >
          z
        </motion.text>
      ))}
    </svg>
  );
}

function Peek({ iris }: { iris: string }) {
  const blink = useBlink();
  const [look, setLook] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setLook((l) => (l === 0 ? (Math.random() > 0.5 ? 2.2 : -2.2) : 0)), 1600);
    return () => clearInterval(id);
  }, []);
  return (
    <svg viewBox="0 0 120 76" aria-hidden="true" style={{ overflow: 'hidden' }}>
      <motion.g
        animate={{ y: [44, 0, 0, 44, 44] }}
        transition={{ duration: 6, repeat: Infinity, times: [0, 0.12, 0.7, 0.82, 1], ease: 'easeOut' }}
      >
        {[[38, 30, 33, 10, 50, 22], [82, 30, 87, 10, 70, 22]].map(([a, b, c, d, e, f], i) => (
          <g key={i}>
            <path d={`M${a} ${b} L${c} ${d} L${e} ${f}Z`} fill={FUR} stroke={LINE} strokeWidth="2.5" strokeLinejoin="round" />
            <path d={`M${a + (i ? -2 : 2)} ${b - 4} L${c} ${d + 6} L${e + (i ? 3 : -3)} ${f + 1}Z`} fill={EAR} />
          </g>
        ))}
        <Fluff blobs={[[60, 48, 24], [38, 54, 11], [82, 54, 11], [46, 32, 10], [74, 32, 10], [60, 28, 11]]} />
        <g style={{ transform: blink ? 'scaleY(0.1)' : 'none', transformOrigin: '60px 52px', transition: 'transform .08s' }}>
          <Eye x={50} y={51} r={6} color={iris} look={look} />
          <Eye x={70} y={51} r={6} color={iris} look={look} />
        </g>
        <path d="M57.5 58 L62.5 58 L60 61Z" fill={NOSE} />
        <Fluff blobs={[[38, 72, 9], [82, 72, 9]]} line={2.5} />
      </motion.g>
    </svg>
  );
}

function Walk({ iris }: { iris: string }) {
  const legs = [44, 58, 90, 104];
  return (
    <svg viewBox="0 0 150 96" aria-hidden="true">
      <Tail d="M36 52 C 22 46, 14 34, 18 16" origin="36px 52px" swish={10} speed={1.2} />
      {legs.map((x, i) => (
        <motion.g
          key={x}
          animate={{ rotate: i % 2 ? [14, -14, 14] : [-14, 14, -14] }}
          transition={{ duration: 0.7, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: `${x}px 62px`, transformBox: 'view-box' } as CSSProperties}
        >
          <rect x={x - 6.5} y={58} width={13} height={28} rx={6.5} fill={LINE} />
          <rect x={x - 4.5} y={58} width={9} height={26} rx={4.5} fill={i < 2 ? SHADE : FUR} />
        </motion.g>
      ))}
      <motion.g animate={{ y: [0, -2, 0] }} transition={{ duration: 0.35, repeat: Infinity }}>
        <Fluff blobs={[[62, 54, 20], [84, 52, 20], [46, 56, 15], [100, 54, 15], [74, 64, 13]]} />
        <path d="M104 30 L106 12 L118 24Z" fill={FUR} stroke={LINE} strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M107 26 L107.5 16 L114 23Z" fill={EAR} />
        <Fluff blobs={[[114, 40, 17], [124, 48, 9], [104, 48, 10], [112, 26, 8]]} />
        <Eye x={120} y={39} r={4.6} color={iris} look={1} />
        <path d="M129.5 45 L132 46.5 L129 48Z" fill={NOSE} />
      </motion.g>
    </svg>
  );
}

const lines = ['mrrp?', 'meow', 'prrrr', ':3', 'feed me', 'mew!', '…', 'nap time'];

type Props = {
  pose?: Pose;
  eyes?: keyof typeof IRIS;
  className?: string;
  style?: CSSProperties;
  flip?: boolean;
};

export default function Cat({ pose = 'sit', eyes = 'copper', className = '', style, flip }: Props) {
  const [say, setSay] = useState<string | null>(null);
  const hop = useAnimationControls();
  const id = useId();
  const iris = IRIS[eyes];

  const poke = () => {
    setSay(lines[Math.floor(Math.random() * lines.length)]);
    hop.start({ y: [0, -10, 0], transition: { duration: 0.35 } });
    setTimeout(() => setSay(null), 1300);
  };

  return (
    <span className={`cat cat--${pose} ${className}`} style={style} onClick={poke} role="img" aria-label="a small fluffy white cat" data-id={id}>
      <motion.span className="cat__body" animate={hop} style={{ scaleX: flip ? -1 : 1 }}>
        {pose === 'sit' && <Sit iris={iris} />}
        {pose === 'loaf' && <Loaf />}
        {pose === 'peek' && <Peek iris={iris} />}
        {pose === 'walk' && <Walk iris={iris} />}
      </motion.span>
      <AnimatePresence>
        {say && (
          <motion.span
            className="cat__say"
            initial={{ opacity: 0, y: 6, scale: 0.6 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6 }}
          >
            {say}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
