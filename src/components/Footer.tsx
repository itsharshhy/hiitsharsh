import { Link } from 'react-router-dom';
import { site } from '../content/site';
import { socials } from '../content/socials';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer__big">
        Made by hand, with glue sticks and TypeScript.
      </p>
      <div className="footer__row">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <span className="footer__links">
          {socials().map((s) => (
            <a key={s.label} href={s.href} target={s.external ? '_blank' : undefined} rel="noreferrer">
              {s.label}
            </a>
          ))}
          <Link to="/contact">say hi ↗</Link>
        </span>
      </div>
    </footer>
  );
}
