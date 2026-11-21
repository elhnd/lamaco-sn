import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { test } from 'node:test';
import { inlineScriptHashes, contentSecurityPolicy } from './security.mjs';

test('CSP hashes exact inline bytes, skips external scripts and JSON-LD', () => {
  const code = '\nconsole.log("LAMACO");\n';
  const hashes = inlineScriptHashes(`<script type="module">${code}</script><script src="/app.js"></script><script type="application/ld+json">{}</script>`);
  assert.deepEqual(hashes, [`'sha256-${createHash('sha256').update(code).digest('base64')}'`]);
  assert.notDeepEqual(hashes, inlineScriptHashes(`<script>${code.trim()}</script>`));
});

test('CSP limits execution, framing and submissions without permitting arbitrary inline JS', () => {
  const hash = inlineScriptHashes('<script>console.log(1)</script>')[0];
  const policy = contentSecurityPolicy([hash, hash]);
  assert.equal(policy.split(hash).length, 2);
  assert(!policy.match(/script-src[^;]*unsafe-inline|unsafe-eval/));
  for (const directive of ["script-src-attr 'none'", "object-src 'none'", "base-uri 'none'", "form-action 'none'", "frame-ancestors 'none'"]) assert(policy.includes(directive));
});
