<template>
  <div class="text-block">
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
});
</script>

<style lang="scss">
.text-block {
  background-color: rgb(var(--v-theme-text-block-background), 50%);
  border-radius: 12px;
  padding: 15px;
  width: fit-content;
  &__header {
    color: rgb(var(--v-theme-text-paragraph));
    font-size: 22px;

    @media (max-width: 500px) {
      font-size: 18px;
    }
  }
  &__text {
    color: rgb(var(--v-theme-text-paragraph));
    font-size: 14px;
    @media (max-width: 500px) {
      font-size: 10px;
    }
  }
}
</style>
