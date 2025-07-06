<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";

const isDark = ref(false);

const theme = useTheme();

const toggleTheme = () => {
  isDark.value = !isDark.value;
  theme.global.name.value = isDark.value ? "dark" : "light";
  localStorage.setItem("theme", theme.global.name.value);
  if (localStorage.getItem("theme")) {
    theme.global.name.value = localStorage.getItem("theme");
  }
};
</script>

<template>
  <v-btn
    class="header-theme"
    :icon="isDark ? 'fa-sun' : 'fa-moon'"
    :aria-label="
      $t('themeToggle', {
        theme: isDark ? $t('light') : $t('dark'),
      })
    "
    color="primary"
    variant="text"
    @click="toggleTheme"
  ></v-btn>
</template>

<style scoped>
.header-theme ::v-deep .v-btn__content svg {
  font-size: 24px;
  color: rgb(var(--v-theme-theme-icon));
}
</style>
