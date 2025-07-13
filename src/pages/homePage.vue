<template>
  <div class="home-page">
    <div class="home-page__content">
      <div class="home-page__section home-page__section--1 section">
        <app-triptych />
        <button class="section__scroll-btn">↓</button>
      </div>
      <div class="home-page__section home-page__section--2 section">
        <h1 class="section__title">История ансамбля</h1>
        <div class="section__content">
          <div class="regular-section">
            <h2>Заголовок 1</h2>
            <p>Описание...</p>
          </div>
        </div>
        <button class="section__scroll-btn">↓</button>
      </div>
      <div class="home-page__section home-page__section--3 section">
        <h1 class="section__title">Расписание концертов</h1>
        <div class="section__content">
          <div class="regular-section">
            <h2>Заголовок 1</h2>
            <p>Описание...</p>
          </div>
        </div>
        <button class="section__scroll-btn">↓</button>
      </div>
      <div class="home-page__section home-page__section--4 section">
        <h1 class="section__title">Наши партнеры</h1>
        <div class="section__content">
          <div class="regular-section">
            <h2>Заголовок 1</h2>
            <p>Описание...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import AppTriptych from "@/components/AppTriptych.vue";

onMounted(() => {
  const buttons = document.querySelectorAll(".section__scroll-btn");
  const sections = document.querySelectorAll(".section");

  buttons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      e.stopPropagation();
      const nextSection = sections[index + 1];
      if (nextSection) {
        const headerOffset = 64;
        const elementPosition = nextSection.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});
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
  position: relative;

  &__title {
    display: flex;
    align-items: center;

    height: 64px;
    width: 100%;
    padding: 0 100px;

    font-size: 22px;
    color: #666;
    background-color: white;
  }

  &__content {
    z-index: 1;
    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.6);
  }

  &__scroll-btn {
    position: absolute;
    z-index: 2;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 50%;
    width: 36px;
    height: 36px;
    font-size: 24px;
    color: rgba(255, 255, 255, 0.7);
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background: rgba(255, 255, 255, 0.7);
    }
  }
}

.regular-section {
  padding: 0 100px;
}
</style>
