import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { htmlFiles } from './sitemap.mjs';

export function inlineScriptHashes(html) {
  const hashes = [];
  for (const [, attributes, code] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)) {
    if (/\bsrc\s*=/i.test(attributes) || /\btype\s*=\s*["']application\/ld\+json["']/i.test(attributes)) continue;
    hashes.push(`'sha256-${createHash('sha256').update(code).digest('base64')}'`);
  }
  return hashes;
}

export function contentSecurityPolicy(hashes) {
  return [
    "default-src 'self'",
    `script-src 'self' ${[...new Set(hashes)].sort().join(' ')}`.trim(),
    "script-src-attr 'none'",
    // GSAP, map positioning and existing inline styles require style attributes.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://tile.openstreetmap.org",
    "font-src 'self'", "connect-src 'self'", "object-src 'none'",
    "base-uri 'none'", "form-action 'none'", "frame-ancestors 'none'",
  ].join('; ');
}

export default function securityIntegration() {
  return {
    name: 'lamaco-static-security',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const hashes = new Set();
        for (const file of await htmlFiles(dir)) {
          for (const hash of inlineScriptHashes(await readFile(file, 'utf8'))) hashes.add(hash);
        }
        const path = new URL('.htaccess', dir);
        const base = (await readFile(path, 'utf8')).split('# BEGIN GENERATED CSP')[0].trimEnd();
        const policy = contentSecurityPolicy(hashes);
        await writeFile(path, `${base}\n\n# BEGIN GENERATED CSP\n<IfModule mod_headers.c>\n  Header always set Content-Security-Policy "${policy}"\n</IfModule>\n# END GENERATED CSP\n`);
        logger.info(`CSP generated with ${hashes.size} inline script hashes`);
      },
    },
  };
}
