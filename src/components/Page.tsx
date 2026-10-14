import { motion } from 'framer-motion';
import { useEffect, type ReactNode } from 'react';

// Every page fades and lifts in like a sheet of paper being set down.
export default function Page({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <motion.main
      id="main"
      className={className}
      initial={{ opacity: 0, y: 24, rotate: -0.4 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      exit={{ opacity: 0, y: -16, rotate: 0.3 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}
