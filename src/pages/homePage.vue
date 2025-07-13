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
            <h2 class="regular-section__title">Заголовок 1</h2>
            <div class="regular-section__content">
              <div class="regular-section__content-left">
                regular-section__content-left
              </div>
              <div class="regular-section__content-center">
                regular-section__content-center
              </div>
              <div class="regular-section__content-right">
                Born in Bilbao, he studied cello, chamber music and conducting
                at Bachelor and Masters level in Spain and Holland, where he
                studied baroque cello at the Royal Conservatory of The Hague and
                was mentored by Anner Bylsma. Josetxu performs on a regular
                basis at the most prestigious concert halls in 18 different
                European countries, the United States, Mexico, Chile, Costa
                Rica, Bolivia, Japan and China; at venues such as the
                Concertgebouw Amsterdam, Tokyo Opera City, Centro Nacional de
                las Artes de México, the Royal Festival Hall London. He has
                played with some of Europe’s most important ensembles, such as
                the Royal Concertgebouw Orchestra, and in the context of Early
                Music with Le Concert des Nations (Jordi Savall), Orchestra of
                the Age of Enlightenment and as first cellist of L’Arpeggiata
                (Christina Pluhar), EUBO (European Union Baroque Orchestra) and
                Arte dei Suonatori, among others. He has recorded for Virgin,
                Verso, Arsis, Columna Música and The Gift of Music record labels
                and also for BBC3, NPS Radio 3 Holland, Mezzo, the Spanish
                National Radio and TV and the Macedonian TV, among others.
                Josetxu plays an original 1740 cello by Sebastian Klotz and
                recently he had the honor to play at the Palacio Real de Madrid
                the Stradivarius 1700 that belongs to the Spanish Royal
                Collection.
              </div>
            </div>
          </div>
        </div>
        <button class="section__scroll-btn">↓</button>
      </div>
      <div class="home-page__section home-page__section--3 section">
        <h1 class="section__title">Расписание концертов</h1>
        <div class="section__content">
          <p>Описание...</p>
        </div>
        <button class="section__scroll-btn">↓</button>
      </div>
      <div class="home-page__section home-page__section--4 section">
        <h1 class="section__title">Наши партнеры</h1>
        <div class="section__content">
          <p>Описание...</p>
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
    display: flex;
    align-items: center;
    justify-content: center;

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
  width: 80%;
  padding: 0 100px;

  color: black;
  background-color: white;

  // &__title {

  // }

  &__content {
    display: flex;

    &-left,
    &-center {
      flex: 0 0 25%;
    }

    &-right {
      flex: 0 1 50%;

      font-size: 14px;
      line-height: 1.4;
    }
  }
}
</style>
