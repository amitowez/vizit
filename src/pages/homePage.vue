<template>
  <div class="home-page">
    <div class="home-page__content">
      <div class="home-page__section home-page__section--1 section">
        <app-triptych />
      </div>
      <div class="home-page__section home-page__section--2 section">
        <div class="section__title">История ансамбля</div>
        <div class="section__content">
          <h1>Заголовок 1</h1>
          <p>Описание...</p>
        </div>
      </div>
      <div class="home-page__section home-page__section--3 section">
        <div class="section__title">История ансамбля</div>
        <div class="section__content">
          <h1>Заголовок 1</h1>
          <p>Описание...</p>
        </div>
      </div>
      <div class="home-page__section home-page__section--4 section">
        <div class="section__title">История ансамбля</div>
        <div class="section__content">
          <h1>Заголовок 1</h1>
          <p>Описание...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppTriptych from "@/components/AppTriptych.vue";
</script>

<style scoped lang="scss">
.home-page {
  color: white;

  &__section {
    width: 100%;
    height: calc(100vh - 64px);

    &--1 {
      position: relative;
      z-index: 1;

      background: url("@/assets/img/bg1.jpg") center center / cover no-repeat
        fixed;

      &::before {
        content: "";
        position: absolute;
        inset: 0;
        background: inherit;
        filter: blur(4px);
        z-index: 0;
      }
    }

    &--2 {
      background: url("@/assets/img/bg2.jpg") center center / cover no-repeat
        fixed;
    }

    &--3 {
      background: url("@/assets/img/bg3.jpg") center center / cover no-repeat
        fixed;
    }

    &--4 {
      background: url("@/assets/img/bg1.jpg") center center / cover no-repeat
        fixed;
    }
  }
}

.section {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__title {
    width: 100%;
    background-color: white;
    color: #666;
  }

  &__content {
    z-index: 1;
    padding: 2rem;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
  }
}
</style>
