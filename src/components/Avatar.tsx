import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { eyes, grid, palette } from '../content/avatar';

// Pixel-art me. Drawn from a letter grid (content/avatar.ts), merged into runs so it's
// a few hundred SVG rects instead of a thousand. It bobs to the music in its headphones,
// blinks, looks toward your cursor, its glasses glint, and poking it makes it say hi.

type Run = { x: number; y: number; w: number; c: string };

function toRuns(rows: string[]): Run[] {
  const runs: Run[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const ch = row[x];
      let w = 1;
      while (row[x + w] === ch) w++;
      if (palette[ch]) runs.push({ x, y, w, c: palette[ch] });
      x += w;
    }
  });
  return runs;
}

// A tiny pixel music note: [x, y] cells.
const NOTE = [[2, 0], [3, 0], [2, 1], [4, 1], [2, 2], [2, 3], [0, 4], [1, 4], [2, 4], [0, 5], [1, 5]];

function Note({ x, y, delay, color }: { x: number; y: number; delay: number; color: string }) {
  return (
    <motion.g
      initial={{ opacity: 0, x, y }}
      animate={{ opacity: [0, 1, 1, 0], y: [y, y - 4, y - 8, y - 11], x: [x, x - 1, x + 1, x] }}
      transition={{ duration: 2.6, repeat: Infinity, delay, ease: 'linear', times: [0, 0.2, 0.7, 1] }}
    >
      {NOTE.map(([nx, ny]) => (
        <rect key={`${nx}-${ny}`} x={nx * 0.5} y={ny * 0.5} width={0.5} height={0.5} fill={color} />
      ))}
    </motion.g>
  );
}

export default function Avatar({ size = 'big' }: { size?: 'big' | 'small' }) {
  const ref = useRef<SVGSVGElement>(null);
  const runs = useMemo(() => toRuns(grid), []);
  const [look, setLook] = useState({ dx: 0, up: false });
  const [blink, setBlink] = useState(false);
  const [hi, setHi] = useState(false);

  // Pupils slide one pixel toward the pointer.
  useEffect(() => {
    const move = (e: PointerEvent) => {
      const box = ref.current?.getBoundingClientRect();
      if (!box) return;
      const dx = e.clientX - (box.left + box.width / 2);
      const dy = e.clientY - (box.top + box.height * 0.45);
      setLook({ dx: dx < -60 ? -1 : dx > 60 ? 1 : 0, up: dy < -80 });
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);

  // Blink at slightly random intervals.
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 150);
        loop();
      }, 2000 + Math.random() * 3000);
    };
    loop();
    return () => clearTimeout(t);
  }, []);

  const sayHi = () => {
    setHi(true);
    setTimeout(() => setHi(false), 1800);
  };

  const [top, bottom] = eyes.rows;
  const skin = palette.S;
  const dark = palette.G;

  return (
    <svg
      ref={ref}
      viewBox="-2 -6 36 40"
      className={`avatar avatar--${size}`}
      role="img"
      aria-label="A pixel-art version of Harsh: messy black hair, round glasses, headphones and a purple hoodie"
      shapeRendering="crispEdges"
      onPointerEnter={sayHi}
      onClick={sayHi}
    >
      <g className="avatar__bob">
        {runs.map((r, i) => (
          <rect key={i} x={r.x} y={r.y} width={r.w} height={1} fill={r.c} />
        ))}

        {/* eyes */}
        {eyes.cols.map((c) =>
          blink ? (
            <g key={c}>
              <rect x={c} y={top} width={eyes.width} height={1} fill={skin} />
              <rect x={c} y={bottom} width={eyes.width} height={1} fill={dark} />
            </g>
          ) : (
            <rect key={c} x={c + 1 + look.dx} y={look.up ? top : bottom} width={2} height={1} fill={dark} />
          ),
        )}

        {/* glasses glint */}
        {eyes.cols.map((c, i) => (
          <motion.rect
            key={`glint-${c}`}
            y={top}
            width={1}
            height={1}
            fill="#fff"
            initial={{ x: c, opacity: 0 }}
            animate={{ x: [c, c + eyes.width - 1], opacity: [0, 0.9, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 4, delay: 1 + i * 0.15 }}
          />
        ))}
      </g>

      {/* music leaking out of the headphones */}
      <Note x={1} y={22} delay={0} color="#f5b8d0" />
      <Note x={27} y={22} delay={1.3} color="#f3dc8a" />

      <AnimatePresence>
        {hi && (
          <motion.g
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            style={{ originX: '26px', originY: '0px' }}
          >
            <rect x={23} y={-5} width={10} height={6} fill="#fff" />
            <rect x={22} y={-4} width={12} height={4} fill="#fff" />
            <rect x={24} y={1} width={2} height={1} fill="#fff" />
            <text x={28} y={-1.4} textAnchor="middle" fontSize="4" fontFamily="'DM Mono', monospace" fontWeight="500" fill={dark}>
              hi!
            </text>
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  );
}
