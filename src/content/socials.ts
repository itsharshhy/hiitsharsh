import { site } from './site';

export type Social = { label: string; href: string; value: string; external: boolean };

// Builds the list of ways to reach Harsh, skipping anything left blank in site.ts.
export function socials(): Social[] {
  const handle = (url: string) => url.replace(/\/$/, '').split('/').pop() ?? url;
  const list: (Social | null)[] = [
    site.email ? { label: 'Email', href: `mailto:${site.email}`, value: site.email, external: false } : null,
    site.phone ? { label: 'Phone', href: `tel:${site.phone.replace(/[^+\d]/g, '')}`, value: site.phone, external: false } : null,
    site.instagram ? { label: 'Instagram', href: site.instagram, value: `@${handle(site.instagram)}`, external: true } : null,
    site.twitter ? { label: 'Twitter / X', href: site.twitter, value: `@${handle(site.twitter)}`, external: true } : null,
    site.linkedin ? { label: 'LinkedIn', href: site.linkedin, value: handle(site.linkedin), external: true } : null,
    site.github ? { label: 'GitHub', href: site.github, value: `@${handle(site.github)}`, external: true } : null,
  ];
  return list.filter((s): s is Social => s !== null);
}
