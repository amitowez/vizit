import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "vuetify/styles";
import "@/assets/styles/main.scss";
import i18n from "./i18n";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import getColors from "./assets/styles/colors";

const darkThemePreferred = window.matchMedia("(prefers-color-scheme: dark)");

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
});

createApp(App).use(router).use(vuetify).use(i18n).mount("#app");
