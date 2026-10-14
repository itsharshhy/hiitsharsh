type Props = { src: string; alt: string; caption?: string; tilt?: number; tape?: 'kraft' | 'blue' | 'yellow'; className?: string };

// A photo printed on polaroid paper and taped down.
export default function Polaroid({ src, alt, caption, tilt = 0, tape = 'kraft', className = '' }: Props) {
  return (
    <figure className={`polaroid ${className}`} style={{ rotate: `${tilt}deg` }}>
      <span className={`tape tape--${tape}`} aria-hidden="true" />
      <img src={src} alt={alt} loading="lazy" decoding="async" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
