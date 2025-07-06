<template>
  <v-app>
    <!-- Семантический хедер -->
    <header>
      <v-app-bar app>
        <v-toolbar-title @click="$router.push('/repertoire')">{{
          $t("appTitle")
        }}</v-toolbar-title>
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

        <changeTheme />

        <appBurger class="burger" :languages="languages" />
      </v-app-bar>
    </header>

    <v-main>
      <router-view />
    </v-main>
    <footer>
      <v-footer>
        <v-col class="text-center" cols="12">
          {{ $t("footerText") }} © {{ new Date().getFullYear() }}
        </v-col>
      </v-footer>
    </footer>
  </v-app>
</template>

<script setup>
import appBurger from "./header/appBurger.vue";
import changeTheme from "./header/changeTheme.vue";

const languages = [
  { title: "ру", value: "ru" },
  { title: "en", value: "en" },
  { title: "es", value: "es" },
  { title: "de", value: "de" },
];
</script>

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
.burger {
  display: none;
  @media (max-width: 500px) {
    display: block;
  }
}

.active {
  color: rgb(var(--v-theme-active-lang));
}
</style>
