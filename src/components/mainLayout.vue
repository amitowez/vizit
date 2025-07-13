<template>
  <v-app>
    <!-- Семантический хедер -->
    <header>
      <v-app-bar app>
        <v-toolbar-title @click="$router.push('/repertoire')">{{
          $t("appTitle")
        }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <div class="header-nav">
          <router-link
            v-for="item in navigation"
            :to="item.value"
            :key="item.label"
            class="nav-element"
          >
            {{ $t(item.label) }}
          </router-link>
        </div>

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
        <div class="no-mobile">
          <changeTheme />
        </div>

        <appBurger
          class="burger mobile"
          :languages="languages"
          :navigation="navigation"
        />
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
import AppBurger from "./header/AppBurger.vue";
import ChangeTheme from "./header/ChangeTheme.vue";

const languages = [
  { title: "ру", value: "ru" },
  { title: "en", value: "en" },
  { title: "es", value: "es" },
  { title: "de", value: "de" },
];

const navigation = [
  { label: "about", value: "about" },
  { label: "repertoire", value: "repertoire" },
  { label: "contact", value: "contact" },
];
</script>

<style lang="scss">
.header {
  &-lang {
    display: flex;
    @media (max-width: 500px) {
      display: none;
    }
    &-item {
      cursor: pointer;
      height: 30px;
      margin: 0 10px;
    }
  }
  &-nav {
    @media (max-width: 500px) {
      display: none;
    }
  }
  &-theme {
    height: 60px;
  }
}
.burger {
  width: 50px;
  height: 50px;
}
.nav-element {
  margin: 0px 20px;
  text-decoration: none;
  color: inherit;
  background: none;
  outline: none;
  transition: none;
  font-size: 20px;
  &:hover {
    color: rgb(var(--v-theme-active-lang));
    transition: 300ms;
  }
}
.active {
  color: rgb(var(--v-theme-active-lang));
}
</style>
