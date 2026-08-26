import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../locales/en/translation.json';
import taTranslation from '../locales/ta/translation.json';
import hiTranslation from '../locales/hi/translation.json';
import mlTranslation from '../locales/ml/translation.json';

const STORAGE_KEY = 'shield_language';

const getSavedLanguage = (): string => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && ['en', 'ta', 'hi', 'ml'].includes(saved)) {
      return saved;
    }
  } catch (e) {
    console.warn('Unable to access localStorage for language preference:', e);
  }
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      ta: { translation: taTranslation },
      hi: { translation: hiTranslation },
      ml: { translation: mlTranslation },
    },
    lng: getSavedLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React escapes HTML by default
    },
  });

i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
  } catch (e) {
    console.warn('Unable to persist language choice to localStorage:', e);
  }
});

export default i18n;

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
] as const;

export type SupportedLanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];
