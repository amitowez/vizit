<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn :icon="'fa-bars'" v-bind="props" class="burger-icon"> </v-btn>
      </template>
      <v-list>
        <div style="display: flex; justify-content: space-between">
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
        <div
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0 10px;
          "
        >
          <router-link
            v-for="item in navigation"
            :to="item.value"
            :key="item.label"
            class="nav-element-burger"
          >
            {{ $t(item.label) }}
          </router-link>
          <ChangeTheme />
        </div>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import ChangeTheme from "./ChangeTheme.vue";
defineProps({
  languages: Array,
  navigation: Array,
});
</script>

<style lang="scss">
.nav-element-burger {
  text-decoration: none;
  color: inherit;
  background: none;
  outline: none;
  transition: none;
  font-size: 30px;
  font-family: "Playfair Display", sans-serif;
}
</style>
