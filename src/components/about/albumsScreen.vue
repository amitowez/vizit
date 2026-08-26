<template>
  <div class="albums">
    <div class="animate-container anim-1" :ref="(el) => setAnimElement(el, 0)">
      <appTextBlock :header="$t('albums.title')" />
    </div>

    <div class="albums__list">
      <a
        v-for="(album, i) in albums"
        :key="album.url"
        class="album-card animate-container"
        :class="`anim-${i + 2}`"
        :ref="(el) => setAnimElement(el, i + 1)"
        :href="album.url"
        target="_blank"
        rel="noopener"
      >
        <span class="album-card__vinyl" aria-hidden="true">
          <span class="album-card__label">{{ ROMAN[i] }}</span>
        </span>
        <span class="album-card__info">
          <span class="album-card__name">{{ $t(album.titleKey) }}</span>
          <span class="album-card__listen">
            <span class="album-card__play" aria-hidden="true">▶</span>
            {{ $t("albums.listen") }}
          </span>
        </span>
      </a>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import appTextBlock from "@/components/common/appTextBlock.vue";
import { useAnim } from "@/composables/useAnim";

const props = defineProps({
  scroll: Object,
  sectionIndex: Number,
});

const { setAnimElement } = useAnim({
  currentSectionIndex: props.scroll.currentSectionIndex,
  sectionIndex: props.sectionIndex,
});

const ROMAN = ["I", "II", "III", "IV"];

const albums = [
  { url: "https://music.yandex.ru/album/37693960", titleKey: "albums.first" },
  { url: "https://music.yandex.ru/album/27957908", titleKey: "albums.second" },
];
</script>

<style lang="scss">
.albums {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 34px;
  padding: 40px 50px 70px;

  &__list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 30px;
    width: 100%;
  }
}

.album-card {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 22px 30px 22px 22px;
  text-decoration: none;
  position: relative;
  background: rgba(var(--v-theme-text-block-background), 0.86);
  border: 1px solid rgba(var(--v-theme-frame), 0.65);
  border-radius: 2px;
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.28);
  transition: transform 0.35s ease, box-shadow 0.35s ease;

  &::before {
    content: "";
    position: absolute;
    inset: 5px;
    border: 1px solid rgba(var(--v-theme-frame), 0.35);
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.4),
      0 0 26px rgba(var(--v-theme-gold), 0.18);

    .album-card__vinyl {
      animation: vinyl-spin 2.8s linear infinite;
    }

    .album-card__listen {
      background: rgb(var(--v-theme-gold));
      color: rgb(var(--v-theme-text-block-background));
    }
  }

  &__vinyl {
    flex: 0 0 auto;
    width: 132px;
    height: 132px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: radial-gradient(
        circle at 34% 30%,
        rgba(255, 255, 255, 0.16),
        transparent 42%
      ),
      repeating-radial-gradient(circle, #101010 0, #1d1d1d 2px, #101010 4px);
    box-shadow: 0 8px 22px rgba(0, 0, 0, 0.5),
      0 0 0 1px rgba(var(--v-theme-gold), 0.55);
  }

  &__label {
    position: relative;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    background: radial-gradient(circle, #e8c96f, #b98f3e 72%, #9a742c);
    border: 1px solid #6e5218;
    font-family: "Forum", "Georgia", serif;
    font-size: 19px;
    color: #2a1a08;

    &::after {
      content: "";
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #101010;
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  &__name {
    font-family: "Forum", "Georgia", serif;
    font-size: 21px;
    letter-spacing: 0.06em;
    color: rgb(var(--v-theme-text-header));
  }

  &__listen {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    width: fit-content;
    padding: 7px 18px;
    border: 1px solid rgba(var(--v-theme-gold), 0.8);
    border-radius: 999px;
    font-size: 14px;
    letter-spacing: 0.04em;
    color: rgb(var(--v-theme-gold));
    transition: background 0.3s, color 0.3s;
  }

  &__play {
    font-size: 10px;
  }

  @media (max-width: 640px) {
    width: 100%;
    gap: 16px;
    padding: 16px;

    &__vinyl {
      width: 96px;
      height: 96px;
    }

    &__label {
      width: 42px;
      height: 42px;
      font-size: 16px;
    }

    &__name {
      font-size: 17px;
    }

    &__listen {
      font-size: 12px;
      padding: 6px 14px;
    }
  }
}

@keyframes vinyl-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 640px) {
  .albums {
    padding: 24px 14px 40px;
    gap: 20px;

    &__list {
      flex-direction: column;
      gap: 16px;
    }
  }
}
</style>
