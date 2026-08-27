import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '../locales/en/translation.json';
import taTranslation from '../locales/ta/translation.json';
import hiTranslation from '../locales/hi/translation.json';
import mlTranslation from '../locales/ml/translation.json';
import { scienceCurriculumData } from '../data/scienceCurriculumData';
import { mathCurriculumData } from '../data/mathCurriculumData';
import { techCurriculumData } from '../data/techCurriculumData';
import { engCurriculumData } from '../data/engCurriculumData';

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
      en: {
        translation: {
          ...enTranslation,
          scienceCurriculum: scienceCurriculumData.en,
          mathCurriculum: mathCurriculumData.en,
          techCurriculum: techCurriculumData.en,
          engCurriculum: engCurriculumData.en,
          levels: {
            ...scienceCurriculumData.en.levels,
            ...mathCurriculumData.en.levels,
            ...techCurriculumData.en.levels,
            ...engCurriculumData.en.levels,
            ...((enTranslation as any).levels || {})
          },
        },
      },
      ta: {
        translation: {
          ...taTranslation,
          scienceCurriculum: scienceCurriculumData.ta,
          mathCurriculum: mathCurriculumData.ta,
          techCurriculum: techCurriculumData.ta,
          engCurriculum: engCurriculumData.ta,
          levels: {
            ...scienceCurriculumData.ta.levels,
            ...mathCurriculumData.ta.levels,
            ...techCurriculumData.ta.levels,
            ...engCurriculumData.ta.levels,
            ...((taTranslation as any).levels || {})
          },
        },
      },
      hi: {
        translation: {
          ...hiTranslation,
          scienceCurriculum: scienceCurriculumData.hi,
          mathCurriculum: mathCurriculumData.hi,
          techCurriculum: techCurriculumData.hi,
          engCurriculum: engCurriculumData.hi,
          levels: {
            ...scienceCurriculumData.hi.levels,
            ...mathCurriculumData.hi.levels,
            ...techCurriculumData.hi.levels,
            ...engCurriculumData.hi.levels,
            ...((hiTranslation as any).levels || {})
          },
        },
      },
      ml: {
        translation: {
          ...mlTranslation,
          scienceCurriculum: scienceCurriculumData.ml,
          mathCurriculum: mathCurriculumData.ml,
          techCurriculum: techCurriculumData.ml,
          engCurriculum: engCurriculumData.ml,
          levels: {
            ...scienceCurriculumData.ml.levels,
            ...mathCurriculumData.ml.levels,
            ...techCurriculumData.ml.levels,
            ...engCurriculumData.ml.levels,
            ...((mlTranslation as any).levels || {})
          },
        },
      },
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
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
] as const;

export type SupportedLanguageCode = typeof SUPPORTED_LANGUAGES[number]['code'];
