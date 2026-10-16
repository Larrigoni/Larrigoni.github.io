/**
 * Il biglietto digitale (/card/lorenzo, brief §6.19): la pagina che apre il
 * tag NFC. Un numero scritto due volte (testo e link) e un .vcf scritto a mano
 * divergono in silenzio: qui si verifica che dicano la stessa cosa, e che la
 * frase sia quella della home, non una seconda versione.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

import { home } from '../src/data/home.ts';
import { pages } from '../src/data/pages.ts';

const { claim, name, phone, role, save, write } = pages.card;
// Il .vcf è quello a cui punta «Salva il contatto», servito da public/.
const vcf = readFileSync(new URL(`../public${save.href}`, import.meta.url), 'utf8');
const digits = (s: string) => s.replace(/\D/g, '');
const line = (s: string) => new RegExp(`^${s.replace(/[+.]/g, '\\$&')}\\r?$`, 'm');

test('il cellulare del biglietto: il link tel: chiama le stesse cifre che si leggono', () => {
  assert.match(phone.href, /^tel:\+\d{8,15}$/);
  assert.equal(digits(phone.href), digits(phone.label));
});

test('il .vcf porta lo stesso nome, cellulare, mestiere ed email della pagina', () => {
  assert.match(vcf, line(`FN:${name}`));
  assert.match(vcf, line(`TEL;TYPE=CELL:${phone.href.slice('tel:'.length)}`));
  assert.match(vcf, line(`TITLE:${role}`));
  assert.match(vcf, line(`EMAIL;TYPE=INTERNET:${write.href.slice('mailto:'.length)}`));
});

test('la frase del biglietto è la prima frase del lead della home, senza i segni del grassetto', () => {
  const hero = home.sections.find((s) => s.id === 'hero');
  const first = (hero?.lead ?? '').replace(/\*\*/g, '').split(':')[0];
  assert.equal(claim.text, `${first}.`);
});

test('la parte rossa compare una volta sola nella frase: la pagina la taglia in due', () => {
  assert.equal(claim.text.split(claim.accent).length, 2);
});
