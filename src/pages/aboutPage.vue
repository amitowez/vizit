<template>
  <div class="about-page">
    <div class="about-page__content">
      <section class="about-page__section paralax-section--1">
        <oneScreen :scroll="scroll" :sectionIndex="0" />
        <button class="scroll-btn" aria-label="Вниз">↓</button>
      </section>

      <section class="about-page__section paralax-section__about--1">
        <twoScreen :scroll="scroll" :sectionIndex="1" />
        <button class="scroll-btn" aria-label="Вниз">↓</button>
      </section>

      <section class="about-page__section paralax-section--2">
        <threeScreen :scroll="scroll" :sectionIndex="2" />
        <button class="scroll-btn" aria-label="Вниз">↓</button>
      </section>

      <section class="about-page__section paralax-section__about--2">
        <fourScreen :scroll="scroll" :sectionIndex="3" />
        <button class="scroll-btn" aria-label="Вниз">↓</button>
      </section>

      <section class="about-page__section paralax-section--3">
        <fiveScreen :scroll="scroll" :sectionIndex="4" />
        <button class="scroll-btn" aria-label="Вниз">↓</button>
      </section>

      <section class="about-page__section paralax-section__about--3">
        <sixScreen :scroll="scroll" :sectionIndex="5" />
        <button class="scroll-btn" aria-label="Вниз">↓</button>
      </section>

      <section class="about-page__section paralax-section__about--4">
        <albumsScreen :scroll="scroll" :sectionIndex="6" />
        <button class="scroll-btn" aria-label="Вниз">↓</button>
      </section>

      <section class="about-page__section paralax-section--4">
        <sevenScreen :scroll="scroll" :sectionIndex="7" />
      </section>
    </div>
  </div>
</template>

<script setup>
import { useScrollBtn } from "@/composables/useScrollBtn";
import oneScreen from "@/components/about/oneScreen.vue";
import twoScreen from "@/components/about/twoScreen.vue";
import threeScreen from "@/components/about/threeScreen.vue";
import fourScreen from "@/components/about/fourScreen.vue";
import fiveScreen from "@/components/about/fiveScreen.vue";
import sixScreen from "@/components/about/sixScreen.vue";
import albumsScreen from "@/components/about/albumsScreen.vue";
import sevenScreen from "@/components/about/sevenScreen.vue";
const scroll = useScrollBtn();
</script>

<style lang="scss">
.about-page {
  color: white;

  &__section {
    display: flex;
    flex-direction: column;
    width: 100%;
    // Секция стремится к высоте экрана, но растёт под контент
    min-height: calc(100vh - 64px);
    overflow: hidden;

    > :not(.scroll-btn) {
      width: 100%;
      flex: 1 0 auto;
    }
  }
}
</style>
