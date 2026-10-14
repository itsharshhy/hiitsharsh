import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/work', label: 'Projects' },
  { to: '/about', label: 'About Me' },
  { to: '/contact', label: 'Contact' },
];

export default function Nav() {
  const { pathname, hash } = useLocation();
  const [open, setOpen] = useState(false);
  const light = pathname.startsWith('/work') || pathname === '/about' || pathname === '/contact';

  useEffect(() => setOpen(false), [pathname, hash]);

  return (
    <header className={`nav ${light ? 'nav--light' : ''} ${open ? 'nav--open' : ''}`}>
      <button className="nav__toggle" aria-expanded={open} aria-controls="nav-links" onClick={() => setOpen((o) => !o)}>
        {open ? 'close' : 'menu'}
      </button>
      <nav id="nav-links" aria-label="Main">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to !== '/work'}
            className={({ isActive }) => (isActive ? 'is-active' : undefined)}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
