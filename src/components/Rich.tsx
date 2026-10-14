import { Fragment, type ReactNode } from 'react';
import { Link } from 'react-router-dom';

// Tiny inline formatter for the about text: **bold**, *italic*, and a few words that link.
const links: Record<string, string> = { Pebbles: '/work/pebble', Pebble: '/work/pebble' };

export default function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((p, i): ReactNode => {
        if (p.startsWith('**')) {
          const inner = p.slice(2, -2);
          return links[inner] ? (
            <Link key={i} to={links[inner]} className="rich-link">
              <strong>{inner}</strong>
            </Link>
          ) : (
            <strong key={i}>{inner}</strong>
          );
        }
        if (p.startsWith('*')) return <em key={i}>{p.slice(1, -1)}</em>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </>
  );
}
