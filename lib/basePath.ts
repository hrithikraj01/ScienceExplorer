/**
 * Sub-path the site is deployed under (e.g. "/ScienceExplorer" on GitHub Pages).
 * Empty for local dev and root-domain hosting.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** next/link adds basePath automatically; next/image and plain URLs do not. */
export function withBasePath(path: string): string {
  if (!basePath || !path.startsWith("/") || path.startsWith(`${basePath}/`)) {
    return path;
  }
  return `${basePath}${path}`;
}