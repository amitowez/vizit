import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vuetify/styles";
import "@/assets/styles/main.scss";
import i18n from "./i18n";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import getColors from "./assets/styles/colors";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSun, faMoon, faBars } from "@fortawesome/free-solid-svg-icons";

const darkThemePreferred = window.matchMedia("(prefers-color-scheme: dark)");
library.add(faSun, faMoon, faBars);
const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: darkThemePreferred.matches ? "dark" : "light",
    themes: {
      light: {
        dark: false,
        colors: getColors("light"),
      },
      dark: {
        dark: true,
        colors: getColors("dark"),
      },
    },
  },
  display: {
    mobileBreakpoint: "lg",
    thresholds: {
      xs: 0,
      sm: 340,
      md: 540,
      lg: 800,
      xl: 1280,
    },
  },
  icons: {
    defaultSet: "fa",
    aliases: {
      sun: "fa-sun",
      moon: "fa-moon",
      bars: "fa-bars",
    },
    sets: {
      fa: {
        component: FontAwesomeIcon,
      },
    },
  },
});

createApp(App)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .use(vuetify)
  .use(i18n)
  .mount("#app");
