<template>
  <div class="text-block" :class="{ 'text-block--drop-cap': dropCap }">
    <h2 class="text-block__header" v-if="props.header">{{ props.header }}</h2>
    <p class="text-block__text" v-if="props.text">{{ props.text }}</p>
    <slot> </slot>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps({
  header: String,
  text: String,
  dropCap: Boolean,
});
</script>

<style lang="scss">
.text-block {
  position: relative;
  background: rgba(var(--v-theme-text-block-background), 0.86);
  border: 1px solid rgba(var(--v-theme-frame), 0.65);
  border-radius: 2px;
  padding: 20px 26px;
  width: fit-content;
  box-shadow: 0 6px 22px rgba(0, 0, 0, 0.28);

  &::before {
    content: "";
    position: absolute;
    inset: 5px;
    border: 1px solid rgba(var(--v-theme-frame), 0.35);
    pointer-events: none;
  }

  &__header {
    color: rgb(var(--v-theme-text-header));
    font-family: "Forum", "Georgia", serif;
    font-size: 22px;
    line-height: 1.35;

    @media (max-width: 500px) {
      font-size: 17px;
    }
  }

  // Орнамент под заголовком — только когда за ним следует текст
  &:has(.text-block__text) .text-block__header::after {
    content: "❧";
    display: block;
    margin-top: 6px;
    font-size: 14px;
    color: rgba(var(--v-theme-gold), 0.9);
  }

  &__text {
    color: rgb(var(--v-theme-text-paragraph));
    font-size: 15px;
    line-height: 1.65;

    @media (max-width: 500px) {
      font-size: 12px;
      line-height: 1.55;
    }
  }

  &--drop-cap .text-block__text::first-letter {
    font-family: "Forum", "Georgia", serif;
    font-size: 3em;
    line-height: 0.82;
    float: left;
    padding: 4px 8px 0 0;
    color: rgb(var(--v-theme-rubric));
  }
}
</style>
