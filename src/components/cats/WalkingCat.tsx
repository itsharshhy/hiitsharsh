import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Cat from './Cat';

// A cat that strolls from one end of its strip to the other, turns around, and walks back.
export default function WalkingCat({ speed = 45, className = '' }: { speed?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const catW = 70;
  const dist = Math.max(0, w - catW);
  const leg = dist / speed;

  return (
    <div ref={ref} className={`walk-strip ${className}`} aria-hidden="true">
      {dist > 0 && (
        <motion.div
          className="walk-strip__cat"
          style={{ width: catW }}
          animate={{ x: [0, dist, dist, 0, 0], scaleX: [1, 1, -1, -1, 1] }}
          transition={{ duration: leg * 2 + 1.2, times: [0, 0.48, 0.5, 0.98, 1], repeat: Infinity, ease: 'linear' }}
        >
          <Cat pose="walk" />
        </motion.div>
      )}
    </div>
  );
}
