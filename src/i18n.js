import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-xhr-backend";
import { initReactI18next } from "react-i18next";

i18n
  // load translation using xhr -> see /public/locales
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en-US",
    debug: false,
    react: {
      useSuspense: false // not need to have alternative view
    },
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

export default i18n;