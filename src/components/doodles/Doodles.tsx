// Crayon-ish doodles, like the ones stuck around a zine page.
// The rough edge comes from an SVG turbulence filter applied in CSS (.crayon).

export function Star({ color = '#f4c84a' }: { color?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 6 L62 38 L96 40 L69 61 L79 94 L50 75 L21 94 L31 61 L4 40 L38 38Z" fill={color} stroke="#fff" strokeWidth="6" strokeLinejoin="round" paintOrder="stroke" />
    </svg>
  );
}

export function Asterisk({ color = '#ef5a3c' }: { color?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true">
      <g stroke={color} strokeWidth="12" strokeLinecap="round">
        <path d="M50 10 L50 90 M15 30 L85 70 M15 70 L85 30" />
      </g>
    </svg>
  );
}

export function Tulip({ color = '#f2a7c3', stem = '#8db35a' }: { color?: string; stem?: string }) {
  return (
    <svg viewBox="0 0 100 260" aria-hidden="true">
      <path d="M50 90 L50 258" stroke={stem} strokeWidth="9" strokeLinecap="round" />
      {[130, 170, 210].map((y, i) => (
        <g key={y}>
          <ellipse cx={i % 2 ? 72 : 28} cy={y} rx="20" ry="9" fill={stem} transform={`rotate(${i % 2 ? -25 : 25} ${i % 2 ? 72 : 28} ${y})`} />
          <ellipse cx={i % 2 ? 28 : 72} cy={y + 18} rx="20" ry="9" fill={stem} transform={`rotate(${i % 2 ? 25 : -25} ${i % 2 ? 28 : 72} ${y + 18})`} />
        </g>
      ))}
      <path d="M18 40 C 18 90, 82 90, 82 40 L 70 54 L 62 30 L 50 52 L 38 30 L 30 54Z" fill={color} />
      <path d="M30 70 L 40 60 M 50 76 L 50 62 M 70 70 L 60 60" stroke="#fff" strokeOpacity=".5" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Cat() {
  return (
    <svg viewBox="0 0 220 200" aria-hidden="true">
      <path d="M20 200 C 10 120, 30 60, 40 20 L 80 58 C 100 52, 124 52, 144 58 L 184 20 C 196 60, 212 120, 202 200Z" fill="#141312" stroke="#fff" strokeWidth="6" paintOrder="stroke" />
      <ellipse cx="78" cy="110" rx="18" ry="12" fill="#f4efe6" />
      <ellipse cx="146" cy="110" rx="18" ry="12" fill="#f4efe6" />
      <ellipse cx="82" cy="110" rx="5" ry="10" fill="#141312" />
      <ellipse cx="142" cy="110" rx="5" ry="10" fill="#141312" />
      <path d="M104 132 L112 140 L120 132 M112 140 L112 150 Q 104 156 98 150 M112 150 Q 120 156 126 150" stroke="#f4efe6" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M40 130 L80 136 M40 146 L80 142 M184 130 L144 136 M184 146 L144 142" stroke="#f4efe6" strokeWidth="2" strokeLinecap="round" />
      <path d="M150 170 L156 182 L170 184 L160 192 L162 206 L150 198" fill="#ef5a3c" />
    </svg>
  );
}

export function Burst({ color = '#fff' }: { color?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true">
      <g stroke={color} strokeWidth="6" strokeLinecap="round">
        {Array.from({ length: 7 }).map((_, i) => {
          const a = (-150 + i * 20) * (Math.PI / 180);
          return <path key={i} d={`M${60 + Math.cos(a) * 30} ${60 + Math.sin(a) * 30} L${60 + Math.cos(a) * 55} ${60 + Math.sin(a) * 55}`} />;
        })}
      </g>
    </svg>
  );
}

export function Coffee() {
  return (
    <svg viewBox="0 0 160 170" aria-hidden="true">
      <path d="M58 30 C 50 18, 66 12, 58 0 M84 30 C 76 18, 92 12, 84 0" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M20 48 L130 48 L120 150 C 118 162, 32 162, 30 150Z" fill="#f2a7c3" stroke="#fff" strokeWidth="6" paintOrder="stroke" />
      <path d="M128 70 C 162 66, 160 120, 122 116" stroke="#f2a7c3" strokeWidth="12" fill="none" />
      {[[50, 80], [86, 96], [62, 124], [100, 130]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="5" fill="#e0475b" />
      ))}
      <path d="M44 102 l6 -8 6 8 M74 76 l5 -7 5 7" stroke="#6fae5b" strokeWidth="3" fill="none" />
    </svg>
  );
}
