import assert from 'node:assert/strict';
import { test } from 'node:test';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { pathToFileURL } from 'node:url';
import { indexableCanonical, writeSitemap } from './sitemap.mjs';

const site = 'https://lamaco-sn.com/';
const page = (path, extra = '') => `<head><link href="${site}${path}" rel="canonical">${extra}</head><body>Contenu</body>`;

test('sitemap accepts public canonical pages and ignores body metadata', () => {
  assert.equal(indexableCanonical(page('materiaux/') + '<meta name="robots" content="noindex">', site), `${site}materiaux/`);
});

for (const [label, html] of [
  ['noindex', page('realisations/', '<meta content="noindex, follow" name="robots">')],
  ['none', page('private/', "<meta name='robots' content='none'>")],
  ['bot noindex', page('private/', '<meta name="googlebot" content="noindex">')],
  ['redirect', page('materiaux/', '<meta http-equiv="refresh" content="0;url=/materiaux/">')],
  ['query', page('materiaux/?famille=sable')],
  ['fragment', page('engins/#pelle-hydraulique')],
  ['external', '<head><link rel="canonical" href="https://example.com/"></head>'],
  ['missing', '<head><title>Technical page</title></head>'],
  ['duplicate', page('', `<link rel="canonical" href="${site}">`)],
]) test(`sitemap excludes ${label}`, () => assert.equal(indexableCanonical(html, site), null));

test('build discovers pages, excludes aliases/noindex, and reflects additions and removals', async () => {
  const directory = await mkdtemp(`${tmpdir()}/lamaco-sitemap-`);
  const dir = pathToFileURL(`${directory}/`);
  const write = async (path, html) => {
    const folder = new URL(path, dir);
    await mkdir(folder, { recursive: true });
    await writeFile(new URL('index.html', folder), html);
  };
  try {
    await write('', page(''));
    await write('materiaux/', page('materiaux/'));
    await write('alias/', page('materiaux/'));
    await write('realisations/', page('realisations/', '<meta name="robots" content="noindex, follow">'));
    assert.equal(await writeSitemap(dir, site), 2);
    let xml = await readFile(new URL('sitemap.xml', dir), 'utf8');
    assert(!xml.includes('alias') && !xml.includes('realisations'));
    await write('contact/', page('contact/'));
    await rm(new URL('materiaux/', dir), { recursive: true });
    assert.equal(await writeSitemap(dir, site), 2);
    xml = await readFile(new URL('sitemap.xml', dir), 'utf8');
    assert(xml.includes(`${site}contact/`) && !xml.includes(`${site}materiaux/`));
  } finally { await rm(dir, { recursive: true, force: true }); }
});
