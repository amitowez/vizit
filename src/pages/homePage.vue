<template>
  <div class="home-page">
    <div class="home-page__content">
      <div class="home-page__regular-section">
        <app-triptych />
      </div>
      <div
        class="home-page__parallax-section home-page__parallax-section--1 parallax-section"
      >
        <div class="parallax-section__title">История ансамбля</div>
        <div class="parallax-section__content">
          <h1>Заголовок 1</h1>
          <p>Описание...</p>
        </div>
      </div>
      <div
        class="home-page__parallax-section home-page__parallax-section--2 parallax-section"
      >
        <div class="parallax-section__title">parallax-section__title</div>
        <div class="parallax-section__content">
          <h2>Блок контента</h2>
          <p>Еще текст...</p>
        </div>
      </div>
      <div
        class="home-page__parallax-section home-page__parallax-section--3 parallax-section"
      >
        <div class="parallax-section__title">parallax-section__title</div>
        <div class="parallax-section__content">
          <h2>И еще один блок</h2>
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
  &__regular-section {
    width: 100%;
    height: calc(100vh - 64px);
  }

  &__parallax-section {
    min-height: 100vh;
    width: 100%;

    &--1 {
      background: url("@/assets/img/bg3.jpg") center center / cover no-repeat
        fixed;
    }

    &--2 {
      background: url("@/assets/img/bg2.jpg") center center / cover no-repeat
        fixed;
    }

    &--3 {
      background: url("@/assets/img/bg1.jpg") center center / cover no-repeat
        fixed;
    }
  }
}

.parallax-section {
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
