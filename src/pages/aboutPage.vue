<template>
  <div class="about-page">
    <div class="about-page__content">
      <section class="about-page__section paralax-section--1">
        <oneScreen :scroll="scroll" :sectionIndex="0" />
        <button class="scroll-btn">↓</button>
      </section>

      <section class="about-page__section paralax-section__about--1">
        <twoScreen :scroll="scroll" :sectionIndex="1" />
        <button class="scroll-btn">↓</button>
      </section>

      <section class="about-page__section paralax-section--2">
        <threeScreen :scroll="scroll" :sectionIndex="2" />
        <button class="scroll-btn">↓</button>
      </section>

      <section class="about-page__section paralax-section__about--2">
        <fourScreen :scroll="scroll" :sectionIndex="3" />
        <button class="scroll-btn">↓</button>
      </section>

      <section class="about-page__section paralax-section--3">
        <fiveScreen :scroll="scroll" :sectionIndex="4" />
        <button class="scroll-btn">↓</button>
      </section>

      <section class="about-page__section paralax-section__about--3">
        <button class="scroll-btn">↓</button>
      </section>

      <section class="about-page__section paralax-section--4">
        <button class="scroll-btn">↓</button>
      </section>

      <section class="about-page__section paralax-section__about--4"></section>
    </div>
  </div>
</template>

<script setup>
import { useScrollBtn } from "@/composables/useScrollBtn";
// import appTextBlock from "@/components/common/appTextBlock.vue";
import oneScreen from "@/components/about/oneScreen.vue";
import twoScreen from "@/components/about/twoScreen.vue";
import threeScreen from "@/components/about/threeScreen.vue";
import fourScreen from "@/components/about/fourScreen.vue";
import fiveScreen from "@/components/about/fiveScreen.vue";
const scroll = useScrollBtn();
</script>

<style lang="scss">
.about-page {
  color: white;

  &__section {
    width: 100%;
    min-height: calc(100vh - 64px);
    height: calc(fit-content - 64px);
  }
}

.paralax-section__about {
  &--1 {
    position: relative;
    background: url("@/assets/img/aboutPeople/all-concert.webp") center center /
      cover no-repeat fixed;
  }

  &--2 {
    position: relative;
    background: url("@/assets/img/aboutPeople/all-pafos.webp") center center /
      cover no-repeat fixed;
  }

  &--3 {
    position: relative;
    background: url("@/assets/img/aboutPeople/all-scene.webp") center center /
      cover no-repeat fixed;
  }

  &--4 {
    position: relative;
    background: url("@/assets/img/aboutPeople/all.webp") center center / cover
      no-repeat fixed;
  }
}
</style>
