// Hand-drawn logos for the contact links, in the site's olive-and-beige sticker style.
// Each sits on a wobbly beige blob with an olive line drawing on top.

const INK = '#3a523b';
const BLOB = 'M32 3 C 48 2, 62 14, 61 31 C 62 48, 49 62, 31 61 C 14 62, 2 48, 3 31 C 2 15, 15 3, 32 3 Z';

function Badge({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <svg className="logo" viewBox="0 0 64 64" role="img" aria-label={title}>
      <path d={BLOB} fill="#fff3d5" stroke={INK} strokeWidth="2.5" />
      <g fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

export function InstagramLogo() {
  return (
    <Badge title="Instagram">
      <rect x="17" y="17" width="30" height="30" rx="9" />
      <circle cx="32" cy="32.5" r="7" />
      <circle cx="40.5" cy="23.5" r="1.2" fill={INK} />
      {/* a tiny heart, because */}
      <path d="M47 11 c -2 -3 -6 -1 -4 2 l 4 4 l 4 -4 c 2 -3 -2 -5 -4 -2 Z" fill="#8fa98d" strokeWidth="1.5" />
    </Badge>
  );
}

export function EmailLogo() {
  return (
    <Badge title="Email">
      <rect x="14" y="20" width="36" height="25" rx="4" />
      <path d="M15 22 L32 35 L49 22" />
      <path d="M32 40 c -2 -3 -6 -1 -4 2 l 4 4 l 4 -4 c 2 -3 -2 -5 -4 -2 Z" fill="#8fa98d" strokeWidth="1.5" />
    </Badge>
  );
}

export function GitHubLogo() {
  return (
    <Badge title="GitHub">
      {/* a cat with code for a mouth */}
      <path d="M18 44 C 15 34, 16 24, 19 15 L 26 22 C 30 21, 34 21, 38 22 L 45 15 C 48 24, 49 34, 46 44 C 40 50, 24 50, 18 44 Z" />
      <circle cx="26.5" cy="31" r="1.8" fill={INK} />
      <circle cx="37.5" cy="31" r="1.8" fill={INK} />
      <path d="M27 39 l -3 2.5 l 3 2.5 M37 39 l 3 2.5 l -3 2.5 M33.5 37.5 l -3 8" strokeWidth="2.2" />
    </Badge>
  );
}

export const logoFor: Record<string, () => React.ReactElement> = {
  Instagram: InstagramLogo,
  Email: EmailLogo,
  GitHub: GitHubLogo,
};
