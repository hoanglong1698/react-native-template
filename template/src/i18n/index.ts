import i18n, { ParseKeys, TOptions } from 'i18next';
import { initReactI18next, useTranslation } from 'react-i18next';
import en from './locales/en';
import vi from './locales/vi';
import { LanguageVariant } from '@/constants';

export const defaultNS = 'translation';
export const resources = {
  [LanguageVariant.EN]: { translation: en },
  [LanguageVariant.VI]: { translation: vi },
} as const;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: LanguageVariant.EN,
  fallbackLng: LanguageVariant.EN,
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});

/**
 * Type-safe translation helper for usage outside React components
 * (e.g. navigation options, stores, API error handling, background tasks).
 */
export function translate<
  K extends ParseKeys<'translation'> = ParseKeys<'translation'>,
>(key: K, options?: TOptions): string {
  return i18n.t(key as any, options as any);
}

export { useTranslation };
export default i18n;
