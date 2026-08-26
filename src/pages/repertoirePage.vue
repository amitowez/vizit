<template>
  <div class="repertoire-page">
    <section class="repertoire-page__section">
      <app-triptych />
    </section>
  </div>
</template>

<script setup>
import AppTriptych from "@/components/AppTriptych.vue";
</script>

<style lang="scss">
.repertoire-page {
  &__section {
    width: 100%;
    height: calc(100vh - 64px);
    // Спокойная «музейная стена» — картины должны солировать
    background: radial-gradient(
        ellipse at 50% 0%,
        rgba(var(--v-theme-gold), 0.08),
        transparent 55%
      ),
      radial-gradient(
        ellipse at center,
        rgb(var(--v-theme-surface)) 0%,
        rgb(var(--v-theme-background)) 88%
      );

    @media (max-width: 960px) {
      height: auto;
      min-height: calc(100vh - 64px);
    }
  }
}
</style>
