/**
 * Link «intent» di Android che apre l'app Contatti sulla schermata «Nuovo
 * contatto», già compilata (extra di ContactsContract.Intents.Insert). Serve
 * perché Android non apre un .vcf nel browser: lo scarica sempre, e poi si
 * deve toccare «Apri». Chrome e gli altri browser Android seguono il link al
 * tocco; se nessuna app lo gestisce, navigano su `fallback` (il .vcf).
 *
 * Su iPhone e sui computer il link non funziona: /card/lorenzo lo mostra solo
 * sui telefoni touch che non sono iOS (pages.css), altrove resta il .vcf.
 * Il contatto creato così non ha il sito web: Insert non ha un extra per l'URL.
 */
export interface ContactIntent {
  name: string;
  /** In formato internazionale, es. +393471234567. */
  phone: string;
  email: string;
  title?: string;
  /** Indirizzo assoluto del .vcf, per i browser che non seguono l'intent. */
  fallback: string;
}

export function androidContactIntent(contact: ContactIntent): string {
  const extra = (key: string, value: string) => `S.${key}=${encodeURIComponent(value)}`;
  return [
    'intent:#Intent',
    'action=android.intent.action.INSERT',
    'type=vnd.android.cursor.dir/raw_contact',
    extra('name', contact.name),
    extra('phone', contact.phone),
    // ContactsContract.CommonDataKinds.Phone.TYPE_MOBILE: il numero entra come «cellulare».
    'i.phone_type=2',
    extra('email', contact.email),
    ...(contact.title ? [extra('job_title', contact.title)] : []),
    extra('browser_fallback_url', contact.fallback),
    'end',
  ].join(';');
}
