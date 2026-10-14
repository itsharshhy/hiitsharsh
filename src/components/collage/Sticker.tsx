import { motion } from 'framer-motion';
import { useRef, type ReactNode, type RefObject } from 'react';
import { useNavigate } from 'react-router-dom';

export type Spot = { x: number; y: number; w: number; r: number };

let topZ = 10;

type Props = {
  spot: Spot;
  bounds: RefObject<HTMLDivElement | null>;
  index: number;
  label?: string;
  to?: string;
  children: ReactNode;
};

// A scrapbook item you can pick up and move around. If it has a `to`, a click
// (that wasn't a drag) takes you there.
export default function Sticker({ spot, bounds, index, label, to, children }: Props) {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const dragged = useRef(false);

  const lift = () => {
    if (ref.current) ref.current.style.zIndex = String(++topZ);
  };

  return (
    <motion.div
      ref={ref}
      className={`sticker ${to ? 'sticker--link' : ''}`}
      style={{ left: `${spot.x}%`, top: `${spot.y}%`, width: `${spot.w}%` }}
      initial={{ opacity: 0, scale: 1.25, y: -40, rotate: spot.r - 12 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotate: spot.r }}
      transition={{ type: 'spring', stiffness: 220, damping: 18, delay: 0.15 + index * 0.07 }}
      whileHover={{ scale: 1.04, rotate: spot.r + (index % 2 ? 2 : -2) }}
      whileDrag={{ scale: 1.08, rotate: spot.r + 4, filter: 'drop-shadow(0 24px 22px rgba(0,0,0,.55))' }}
      drag
      dragConstraints={bounds}
      dragElastic={0.15}
      dragMomentum
      onPointerDown={() => {
        dragged.current = false;
        lift();
      }}
      onDragStart={() => (dragged.current = true)}
      onClick={() => {
        if (to && !dragged.current) navigate(to);
      }}
      onKeyDown={(e) => {
        if (to && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          navigate(to);
        }
      }}
      role={to ? 'link' : undefined}
      tabIndex={to ? 0 : undefined}
      aria-label={to ? label : undefined}
    >
      {children}
      {label && <span className="sticker__label">{label}</span>}
    </motion.div>
  );
}
