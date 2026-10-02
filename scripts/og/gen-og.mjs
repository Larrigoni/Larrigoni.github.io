/**
 * Rigenera public/og.png da scripts/og/og.html con Chrome headless.
 * Il PNG è committato: il build non dipende da Chrome.
 *
 *   node scripts/og/gen-og.mjs [percorso di chrome]
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const CANDIDATES = [
  process.argv[2],
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
].filter(Boolean);
const chrome = CANDIDATES.find((c) => existsSync(c));
if (!chrome) throw new Error('Chrome non trovato: passane il percorso come argomento.');

const html = resolve('scripts/og/og.html');
const out = resolve('public/og.png');
execFileSync(chrome, [
  '--headless=new',
  '--disable-gpu',
  '--hide-scrollbars',
  '--allow-file-access-from-files',
  '--virtual-time-budget=3000',
  `--user-data-dir=${mkdtempSync(join(tmpdir(), 'og-'))}`,
  '--window-size=1200,630',
  `--screenshot=${out}`,
  pathToFileURL(html).href,
], { stdio: 'ignore' });
console.log(`public/og.png: ${Math.round(statSync(out).size / 1024)} KB`);
