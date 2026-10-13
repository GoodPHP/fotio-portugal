import type { Locale } from '../../locales';
import type { LeafCopy } from '../../leaf-copy';
import { LISBOA_EN } from './lisboa.en';
import { LISBOA_PT } from './lisboa.pt';
import { PORTO_EN } from './porto.en';
import { PORTO_PT } from './porto.pt';
import { CASCAIS_EN } from './cascais.en';
import { CASCAIS_PT } from './cascais.pt';
import { BRAGA_EN } from './braga.en';
import { BRAGA_PT } from './braga.pt';
import { COIMBRA_EN } from './coimbra.en';
import { COIMBRA_PT } from './coimbra.pt';
import { EVORA_EN } from './evora.en';
import { EVORA_PT } from './evora.pt';
import { SINTRA_EN } from './sintra.en';
import { SINTRA_PT } from './sintra.pt';
import { ALGARVE_EN } from './algarve.en';
import { ALGARVE_PT } from './algarve.pt';
import { MADEIRA_EN } from './madeira.en';
import { MADEIRA_PT } from './madeira.pt';
import { ACORES_EN } from './acores.en';
import { ACORES_PT } from './acores.pt';
import { DOURO_EN } from './douro.en';
import { DOURO_PT } from './douro.pt';
import { COMPORTA_EN } from './comporta.en';
import { COMPORTA_PT } from './comporta.pt';

/**
 * Authored `service × city` copy, one file per place and language.
 *
 * Each file maps a canonical service id to that page's copy. They are merged
 * here into `${serviceId}--${citySlug}` keys, so the place is named once, by
 * the file, rather than repeated on every entry.
 */
export type CityLeafCopy = Readonly<Record<string, LeafCopy>>;

const SOURCES: ReadonlyArray<{ city: string; en: CityLeafCopy; pt: CityLeafCopy }> = [
  { city: 'lisboa', en: LISBOA_EN, pt: LISBOA_PT },
  { city: 'porto', en: PORTO_EN, pt: PORTO_PT },
  { city: 'cascais', en: CASCAIS_EN, pt: CASCAIS_PT },
  { city: 'braga', en: BRAGA_EN, pt: BRAGA_PT },
  { city: 'coimbra', en: COIMBRA_EN, pt: COIMBRA_PT },
  { city: 'evora', en: EVORA_EN, pt: EVORA_PT },
  { city: 'sintra', en: SINTRA_EN, pt: SINTRA_PT },
  { city: 'algarve', en: ALGARVE_EN, pt: ALGARVE_PT },
  { city: 'madeira', en: MADEIRA_EN, pt: MADEIRA_PT },
  { city: 'acores', en: ACORES_EN, pt: ACORES_PT },
  { city: 'douro', en: DOURO_EN, pt: DOURO_PT },
  { city: 'comporta', en: COMPORTA_EN, pt: COMPORTA_PT },
];

function merge(locale: Locale): Readonly<Record<string, LeafCopy>> {
  const out: Record<string, LeafCopy> = {};
  for (const source of SOURCES) {
    for (const [serviceId, copy] of Object.entries(source[locale])) {
      out[`${serviceId}--${source.city}`] = copy;
    }
  }
  return out;
}

export const LEAF_COPY: Readonly<Record<Locale, Readonly<Record<string, LeafCopy>>>> = {
  en: merge('en'),
  pt: merge('pt'),
};
