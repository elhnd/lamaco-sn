import { readdir, readFile, writeFile } from 'node:fs/promises';

// Read only head tags emitted by the static build, never client-side content.
export function headTags(html) {
  const head = html.match(/<head\b[^>]*>([\s\S]*?)<\/head>/i)?.[1] ?? '';
  return [...head.matchAll(/<(meta|link)\b([^>]+)>/gi)].map(([, tag, attrs]) => ({
    tag: tag.toLowerCase(),
    ...Object.fromEntries([...attrs.matchAll(/([\w:-]+)\s*=\s*(["'])(.*?)\2/g)]
      .map(([, name, , value]) => [name.toLowerCase(), value])),
  }));
}

export function indexableCanonical(html, site) {
  const tags = headTags(html);
  if (tags.some(tag => tag.tag === 'meta' && (
    tag['http-equiv']?.toLowerCase() === 'refresh' ||
    (['robots', 'googlebot', 'bingbot'].includes(tag.name?.toLowerCase()) && /\b(noindex|none)\b/i.test(tag.content))
  ))) return null;
  const canonicals = tags.filter(tag => tag.tag === 'link' && tag.rel === 'canonical');
  if (canonicals.length !== 1) return null;
  try {
    const url = new URL(canonicals[0].href);
    if (url.origin !== new URL(site).origin || url.search || url.hash || url.username || url.password) return null;
    return url.href;
  } catch { return null; }
}

export async function htmlFiles(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const url = new URL(entry.name + (entry.isDirectory() ? '/' : ''), dir);
    if (entry.isDirectory()) files.push(...await htmlFiles(url));
    else if (entry.name.endsWith('.html')) files.push(url);
  }
  return files;
}

export async function writeSitemap(dir, site) {
  const urls = new Set();
  for (const file of await htmlFiles(dir)) {
    const canonical = indexableCanonical(await readFile(file, 'utf8'), site);
    if (!canonical) continue;
    // Only self-canonical, existing output pages; excludes aliases and technical files.
    const route = file.href.slice(dir.href.length).replace(/index\.html$/, '');
    if (new URL(route, site).href === canonical) urls.add(canonical);
  }
  const escapeXml = value => value.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[char]);
  const entries = [...urls].sort().map(url => `  <url><loc>${escapeXml(url)}</loc></url>`);
  await writeFile(new URL('sitemap.xml', dir), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`);
  return urls.size;
}

export default function sitemapIntegration() {
  let site;
  return {
    name: 'lamaco-static-sitemap',
    hooks: {
      'astro:config:done': ({ config }) => { site = config.site; },
      'astro:build:done': async ({ dir, logger }) => {
        if (!site) throw new Error('A production site URL is required for the sitemap.');
        const count = await writeSitemap(dir, site);
        logger.info(`sitemap.xml: ${count} indexable URLs`);
      },
    },
  };
}
