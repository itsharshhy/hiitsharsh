// Public files live under the site's base path (e.g. /hiitsharsh/ on GitHub Pages).
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
