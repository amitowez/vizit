<script setup>
import { ref } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();
const isDark = ref(theme.global.current.value.dark);

const toggleTheme = () => {
  isDark.value = !isDark.value;
  theme.global.name.value = isDark.value ? "dark" : "light";
};
</script>

<template>
  <v-btn
    class="header-theme"
    :icon="isDark ? 'fa-sun' : 'fa-moon'"
    color="primary"
    variant="text"
    @click="toggleTheme()"
  ></v-btn>
</template>

<style scoped>
.header-theme ::v-deep .v-btn__content svg {
  font-size: 24px;
  color: rgb(var(--v-theme-theme-icon));
}
</style>
