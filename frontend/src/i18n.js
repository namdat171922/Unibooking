import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import vi from './locales/vi.json';
import ru from './locales/ru.json';
import it from './locales/it.json';

const resources = {
  en: { translation: en },
  vi: { translation: vi },
  ru: { translation: ru },
  it: { translation: it },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'vi',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
