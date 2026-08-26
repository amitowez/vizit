<template>
  <v-app>
    <header>
      <v-app-bar app flat class="mv-appbar">
        <router-link to="/about" class="mv-brand">
          <span class="mv-brand__fleuron" aria-hidden="true"></span>
          <span class="mv-brand__name">{{ $t("appTitle") }}</span>
          <span
            class="mv-brand__fleuron mv-brand__fleuron--tap"
            aria-hidden="true"
            @click.prevent.stop="onFleuronTap"
          ></span>
        </router-link>

        <v-spacer></v-spacer>

        <nav class="header-nav">
          <router-link
            v-for="item in navigation"
            :to="item.value"
            :key="item.label"
            class="nav-element"
          >
            {{ $t(item.label) }}
          </router-link>
        </nav>

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
      <v-footer class="mv-footer">
        <v-col class="mv-footer__inner" cols="12">
          <div class="ornament-divider mv-footer__ornament">❦</div>
          <div class="mv-footer__text">
            {{ $t("footerText") }} · {{ new Date().getFullYear() }}
          </div>
        </v-col>
      </v-footer>
    </footer>

    <transition name="fade">
      <div v-if="toastVisible" class="eros-toast">🌹 {{ $t("erosOn") }}</div>
    </transition>

    <div v-if="isEros" class="petals" aria-hidden="true">
      <img
        v-for="(petal, i) in petals"
        :key="i"
        class="petal"
        :src="petal.img"
        alt=""
        :style="{
          left: petal.left,
          animationDelay: petal.delay,
          animationDuration: petal.duration,
          width: petal.size,
        }"
      />
    </div>
  </v-app>
</template>

<script setup>
import AppBurger from "@/components/header/appBurger.vue";
import ChangeTheme from "@/components/header/changeTheme.vue";
import { useEros } from "@/composables/useEros";

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

const { isEros, toastVisible, toggle } = useEros();

// Мобильный вход в пасхалку: пять быстрых касаний правого флерона.
let taps = 0;
let tapTimer = null;
const onFleuronTap = () => {
  taps++;
  clearTimeout(tapTimer);
  tapTimer = setTimeout(() => (taps = 0), 1600);
  if (taps >= 5) {
    taps = 0;
    toggle();
  }
};


const PETAL_IMAGES = [
  require("@/assets/img/petals/1.png"),
  require("@/assets/img/petals/2.png"),
  require("@/assets/img/petals/3.png"),
  require("@/assets/img/petals/4.png"),
];

const petals = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  delay: `${(i * 1.9) % 9}s`,
  duration: `${9 + (i % 5) * 2.4}s`,
  size: `${17 + (i % 4) * 7}px`,
  img: PETAL_IMAGES[i % PETAL_IMAGES.length],
}));
</script>

<style lang="scss">
.mv-appbar {
  border-bottom: 1px solid rgba(var(--v-theme-gold), 0.55) !important;
  box-shadow: 0 3px 0 -2px rgba(var(--v-theme-gold), 0.3) !important;
}

.mv-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: 18px;
  text-decoration: none;
  color: rgb(var(--v-theme-on-surface));
  font-family: "Forum", "Georgia", serif;
  font-size: 24px;
  letter-spacing: 0.14em;
  transition: color 0.3s;

  &:hover {
    color: rgb(var(--v-theme-gold));
  }

  &__fleuron {
    color: rgb(var(--v-theme-gold));
    font-size: 16px;
    cursor: pointer;

    &::before {
      content: "❦";
    }
  }

  @media (max-width: 700px) {
    font-size: 19px;
    gap: 8px;
    margin-left: 6px;
  }
}

// В будуаре флероны — картинка: src/assets/img/eros/fleuron.png
body.eros-mode .mv-brand__fleuron::before {
  content: "";
  display: block;
  width: 20px;
  height: 20px;
  background: url("@/assets/img/eros/fleuron.png") center / contain no-repeat;
}

.header-nav {
  @media (max-width: 500px) {
    display: none;
  }
}

.nav-element {
  position: relative;
  margin: 0 16px;
  text-decoration: none;
  color: inherit;
  font-family: "Forum", "Georgia", serif;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  font-size: 14px;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 100%;
    bottom: -6px;
    height: 1px;
    background: rgb(var(--v-theme-gold));
    transition: right 0.3s ease;
  }

  &:hover::after,
  &.router-link-active::after {
    right: 0;
  }

  &.router-link-active {
    color: rgb(var(--v-theme-active-lang));
  }
}

.header-lang {
  display: flex;
  margin: 0 18px 0 26px;

  @media (max-width: 500px) {
    display: none;
  }

  &-item {
    cursor: pointer;
    margin: 0 7px;
    font-family: "Forum", "Georgia", serif;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    opacity: 0.75;
    transition: color 0.3s, opacity 0.3s;

    &:hover {
      opacity: 1;
      color: rgb(var(--v-theme-gold));
    }
  }
}

.active {
  color: rgb(var(--v-theme-active-lang));
  opacity: 1 !important;
}

.burger {
  width: 50px;
  height: 50px;
}

.mv-footer {
  border-top: 1px solid rgba(var(--v-theme-gold), 0.55) !important;

  &__inner {
    text-align: center;
    padding: 10px 0 14px;
  }

  &__ornament {
    max-width: 340px;
    margin: 0 auto 8px;
    font-size: 14px;
  }

  &__text {
    font-style: italic;
    font-size: 14px;
    opacity: 0.85;
  }
}
</style>
