<template>
  <div class="triptych">
    <div class="ornament-divider triptych__heading-row">
      <h2 class="triptych__heading">{{ $t("repertoireTitle") }}</h2>
    </div>

    <div class="triptych__altar">
      <aside class="triptych__wing triptych__wing--left">
        <CardsMenu
          :concerts="concerts"
          :selectedConcertId="selected.id"
          @select="selectConcert"
        />
      </aside>

      <figure class="triptych__center">
        <transition name="art" mode="out-in">
          <img
            :key="selected.id"
            :src="selected.image"
            :alt="selected.title"
            class="triptych__art"
          />
        </transition>
        <figcaption class="triptych__plaque">{{ selected.title }}</figcaption>
      </figure>

      <aside class="triptych__wing triptych__wing--right">
        <appTextBlock
          class="triptych__descr"
          :header="selected.title"
          :text="selected.description"
          drop-cap
        />
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import CardsMenu from "@/components/CardsMenu.vue";
import appTextBlock from "@/components/common/appTextBlock.vue";

import musicians from "@/assets/img/musicians.jpg";
import cardsharps from "@/assets/img/cardsharps.jpg";
import manor from "@/assets/img/bg2.jpg";
import venus from "@/assets/img/venusVertical.jpg";

const { t } = useI18n();

const programDefs = [
  { id: 1, key: "kings", image: musicians },
  { id: 2, key: "madrigals", image: cardsharps },
  { id: 3, key: "estate", image: manor },
  { id: 4, key: "eros", image: venus },
];

const concerts = computed(() =>
  programDefs.map((def) => ({
    ...def,
    title: t(`programs.${def.key}.title`),
    description: t(`programs.${def.key}.description`),
  }))
);

const selectedId = ref(1);
const selected = computed(
  () => concerts.value.find((c) => c.id === selectedId.value) || concerts.value[0]
);

function selectConcert(concert) {
  selectedId.value = concert.id;
}
</script>

<style lang="scss">
.triptych {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 16px 30px 26px;
  color: rgb(var(--v-theme-on-background));

  &__heading-row {
    flex: 0 0 auto;
    margin: 0 auto 16px;
    width: min(760px, 100%);
  }

  &__heading {
    font-size: 24px;
    text-transform: uppercase;
    letter-spacing: 0.3em;
    text-indent: 0.3em;
    color: rgb(var(--v-theme-gold));
    text-shadow: 0 1px 6px rgba(0, 0, 0, 0.25);
  }

  &__altar {
    flex: 1 1 auto;
    min-height: 0;
    display: grid;
    grid-template-columns: 250px 1fr 350px;
    gap: 28px;
    perspective: 1700px;
    align-items: stretch;
  }

  &__wing {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 20px 18px;
    background: rgba(var(--v-theme-surface), 0.8);
    border: 1px solid rgba(var(--v-theme-frame), 0.65);
    box-shadow: inset 0 0 0 5px rgba(var(--v-theme-background), 0.45),
      inset 0 0 60px rgba(0, 0, 0, 0.22), 0 14px 34px rgba(0, 0, 0, 0.35);

    &--left {
      transform: rotateY(9deg);
      transform-origin: right center;
    }

    &--right {
      transform: rotateY(-9deg);
      transform-origin: left center;
      overflow-y: auto;
    }
  }

  &__center {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 0;
    margin: 0;
  }

  &__art {
    max-height: calc(100% - 74px);
    max-width: 100%;
    min-height: 0;
    object-fit: contain;
    box-shadow: 0 0 0 6px #1c1108, 0 0 0 8px rgba(var(--v-theme-gold), 0.85),
      0 0 0 9px #1c1108, 0 22px 48px rgba(0, 0, 0, 0.55);
  }

  &__plaque {
    margin-top: 24px;
    padding: 6px 28px;
    font-family: "Forum", "Georgia", serif;
    letter-spacing: 0.18em;
    text-indent: 0.18em;
    text-transform: uppercase;
    font-size: 14px;
    color: #2a1a08;
    background: linear-gradient(180deg, #e8c96f, #b98f3e 60%, #9a742c);
    border: 1px solid #6e5218;
    border-radius: 3px;
    box-shadow: 0 3px 8px rgba(0, 0, 0, 0.4),
      inset 0 1px 1px rgba(255, 255, 255, 0.5);
    text-align: center;
  }

  &__descr {
    width: 100%;
    max-width: none;
  }
}

.art-enter-active,
.art-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.art-enter-from {
  opacity: 0;
  transform: scale(0.985);
}
.art-leave-to {
  opacity: 0;
  transform: scale(1.012);
}

@media (max-width: 1200px) {
  .triptych__altar {
    grid-template-columns: 210px 1fr 300px;
    gap: 20px;
  }
}

@media (max-width: 960px) {
  .triptych {
    height: auto;
    padding: 16px 16px 30px;

    &__altar {
      display: flex;
      flex-direction: column;
      gap: 18px;
      perspective: none;
    }

    &__wing {
      transform: none;
      justify-content: flex-start;

      &--left {
        order: -1;
        background: none;
        border: none;
        box-shadow: none;
        padding: 0;
      }
    }

    &__art {
      max-height: 54vh;
    }

    &__plaque {
      margin-top: 16px;
    }
  }
}
</style>
