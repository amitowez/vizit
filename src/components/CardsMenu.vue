<template>
  <nav class="cards-menu">
    <ul class="cards-menu__list">
      <li
        v-for="(concert, i) in concerts"
        :key="concert.id"
        class="cards-menu__item"
        :class="{
          'cards-menu__item--active': concert.id === selectedConcertId,
        }"
        @click="onSelectConcert(concert)"
      >
        <span class="cards-menu__numeral" aria-hidden="true">{{
          ROMAN[i]
        }}</span>
        <span class="cards-menu__name">{{ concert.title }}</span>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
defineProps({
  concerts: Array,
  selectedConcertId: Number,
});
const emits = defineEmits(["select"]);

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII"];

function onSelectConcert(concert) {
  emits("select", concert);
}
</script>

<style lang="scss">
.cards-menu {
  width: 100%;

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  &__item {
    position: relative;
    display: flex;
    align-items: baseline;
    gap: 12px;
    padding: 15px 10px;
    cursor: pointer;
    border-bottom: 1px solid rgba(var(--v-theme-frame), 0.4);
    font-family: "Forum", "Georgia", serif;
    color: rgb(var(--v-theme-text-paragraph));
    transition: color 0.25s, background 0.25s, padding-left 0.25s;

    &:first-child {
      border-top: 1px solid rgba(var(--v-theme-frame), 0.4);
    }

    &:hover {
      color: rgb(var(--v-theme-gold));
    }

    &--active {
      color: rgb(var(--v-theme-gold));
      background: linear-gradient(
        90deg,
        rgba(var(--v-theme-gold), 0.14),
        transparent
      );
      padding-left: 18px;

      &::before {
        content: "❧";
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: rgba(var(--v-theme-rubric), 0.95);
        font-size: 15px;
      }
    }
  }

  &__numeral {
    font-size: 21px;
    min-width: 30px;
    color: rgba(var(--v-theme-rubric), 0.95);
  }

  &__name {
    font-size: 17px;
    letter-spacing: 0.05em;
    line-height: 1.3;
  }

  @media (max-width: 960px) {
    &__list {
      flex-direction: row;
      overflow-x: auto;
      gap: 10px;
      padding-bottom: 6px;
      scroll-snap-type: x proximity;
      -webkit-overflow-scrolling: touch;
    }

    &__item {
      flex: 0 0 auto;
      scroll-snap-align: start;
      border: 1px solid rgba(var(--v-theme-frame), 0.55);
      border-radius: 999px;
      padding: 8px 18px;
      background: rgba(var(--v-theme-surface), 0.75);

      &:first-child {
        border-top: 1px solid rgba(var(--v-theme-frame), 0.55);
      }

      &--active {
        background: rgba(var(--v-theme-gold), 0.16);
        border-color: rgb(var(--v-theme-gold));
        padding-left: 18px;

        &::before {
          display: none;
        }
      }
    }

    &__numeral {
      font-size: 15px;
      min-width: auto;
    }

    &__name {
      font-size: 15px;
      white-space: nowrap;
    }
  }
}
</style>
