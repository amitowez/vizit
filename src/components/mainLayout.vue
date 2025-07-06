<template>
  <v-app>
    <!-- Семантический хедер -->
    <header>
      <v-app-bar app>
        <v-toolbar-title>{{ $t("appTitle") }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="header-lang">
          <div
            class="header-lang-item"
            :class="{ active: $i18n.locale === lang.value }"
            v-for="lang in languages"
            :key="lang.title"
            @click="$i18n.locale = lang.value"
          >
            {{ lang.title }}
          </div>
        </div>

        <v-switch
          class="header-theme"
          v-model="isDark"
          :label="
            $t('themeToggle', {
              theme: isDark ? $t('light') : $t('dark'),
            })
          "
          color="primary"
          @update:modelValue="toggleTheme"
        ></v-switch>

        <appBurger />
      </v-app-bar>
    </header>

    <!-- Основной контент -->
    <v-main>
      <!-- <v-container> -->
      <router-view />
      <!-- </v-container> -->
    </v-main>

    <!-- Семантический футер -->
    <footer>
      <v-footer app>
        <v-col class="text-center" cols="12">
          {{ $t("footerText") }} © {{ new Date().getFullYear() }}
        </v-col>
      </v-footer>
    </footer>
  </v-app>
</template>

<script setup>
import { computed } from "vue";
import { useTheme } from "vuetify";
import appBurger from "./header/appBurger.vue";

// Управление темой
const theme = useTheme();
const isDark = computed(() => theme.global.name.value === "dark");

const toggleTheme = () => {
  theme.global.name.value = isDark.value ? "light" : "dark";
  localStorage.setItem("theme", theme.global.name.value);
};

// Восстановление темы из localStorage
if (localStorage.getItem("theme")) {
  theme.global.name.value = localStorage.getItem("theme");
}

// Список языков
const languages = [
  { title: "ру", value: "ru" },
  { title: "en", value: "en" },
  { title: "es", value: "es" },
  { title: "de", value: "de" },
];
</script>

<!-- <style scoped>
header {
  background-color: v-bind("theme.current.value.colors.background");
}
footer {
  background-color: v-bind("theme.current.value.colors.background");
}
</style> -->

<style lang="scss">
.header {
  &-lang {
    display: flex;
    &-item {
      cursor: pointer;
      height: 30px;
      margin: 0 10px;
    }
  }
  &-theme {
    height: 60px;
  }
}

.active {
  color: rgb(var(--v-theme-active-lang));
}
</style>
