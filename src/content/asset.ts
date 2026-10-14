// Public files live under the site's base path (e.g. /portfolio-/ on GitHub Pages).
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
