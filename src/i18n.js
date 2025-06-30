import { createI18n } from "vue-i18n";
import en from "./locales/en.json";
import ru from "./locales/ru.json";
import es from "./locales/es.json";
import de from "./locales/de.json";

const messages = {
  en,
  ru,
  es,
  de,
};

const i18n = createI18n({
  legacy: false,
  locale: "ru",
  fallbackLocale: "en",
  messages,
});

export default i18n;
