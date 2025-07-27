<template>
  <div class="repertoire-page__section paralax-section--1 section">
    <app-triptych />
    <button class="scroll-btn">↓</button>
  </div>
</template>

<script setup>
import AppTriptych from "@/components/AppTriptych.vue";
</script>

<style lang="scss">
.repertoire-page {
  color: white;

  &__section {
    width: 100%;
    height: calc(100vh - 64px);
  }
}
</style>
