<template>
  <div class="repertoire">
    <div class="repertoire__background">
      <!-- <img :src="currentBackground" alt="Concert background" /> -->
      <picture>
        <!-- пример: для экранов шириной больше 1200px можно подключить другой фон -->
        <source
          :srcset="selectedConcert.backgroundMobile || currentBackground"
          media="(max-width: 500px)"
        />
        <img :src="currentBackground" alt="Concert background" />
      </picture>
    </div>

    <div class="repertoire__content">
      <div class="repertoire__left">
        <!-- <img
          :src="selectedConcert.image"
          class="repertoire__concert-image"
          alt="Concert image"
        /> -->
        <picture>
          <!-- пример: для retina или больших экранов можно подгрузить другое изображение -->
          <source
            :srcset="selectedConcert.imageMobile || selectedConcert.image"
            media="(max-width: 500px)"
          />
          <img
            :src="selectedConcert.image"
            class="repertoire__concert-image"
            alt="Concert image"
          />
        </picture>
        <div class="repertoire__descr">
          <span>{{ selectedConcert.title }}</span>
          <p>{{ selectedConcert.description }}</p>
        </div>
      </div>

      <div class="repertoire__right">
        <CardsMenu
          :concerts="concerts"
          :selectedConcertId="selectedConcert.id"
          @select="selectConcert"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import CardsMenu from "@/components/CardsMenu.vue";

import bg1 from "@/assets/img/bg1.jpg";
import musicians from "@/assets/img/musicians.jpg";
import cardsharps from "@/assets/img/cardsharps.jpg";
import venusVertical from "@/assets/img/venusVertical.jpg";

const concerts = ref([
  {
    id: 1,
    title: "Музыка королей",
    description:
      "Описание концерта №1Описание концерта №1Описание концерта №1Описание концерта №1Описание концерта №1Описание концерта №1Описание концерта №1Описание концерта №1Описание концерта №1Описание концерта №1Описание концерта №1Описание концерта №1",
    background: bg1,
    backgroundMobile: require("@/assets/img/bg1.jpg"),
    image: musicians,
    imageMobile: require("@/assets/img/musicians.jpg"),
  },
  {
    id: 2,
    title: "Мадригалы",
    description:
      "Описание концерта №2Описание концерта №2Описание концерта №2Описание концерта №2Описание концерта №2Описание концерта №2Описание концерта №2Описание концерта №2Описание концерта №2Описание концерта №2Описание концерта №2Описание концерта",
    background: bg1,
    backgroundMobile: require("@/assets/img/bg1.jpg"),
    image: cardsharps,
    imageMobile: require("@/assets/img/cardsharps.jpg"),
  },
  {
    id: 3,
    title: "Эрос",
    description:
      "Описание концерта №3Описание концерта №3Описание концерта №3Описание концерта №3Описание концерта №3Описание концерта №3Описание концерта №3Описание концерта №3Описание концерта №3Описание концерта №3Описание концерта №3Описание концерта",
    background: bg1,
    backgroundMobile: require("@/assets/img/bg1.jpg"),
    image: venusVertical,
    imageMobile: require("@/assets/img/venusVertical.jpg"),
  },
]);

const selectedConcert = ref(concerts.value[0]);

const currentBackground = computed(() => selectedConcert.value.background);

function selectConcert(concert) {
  selectedConcert.value = concert;
}
</script>

<style lang="scss" scoped>
.repertoire {
  position: relative;
  width: 100%;
  height: calc(100vh - 64px - 64px);
  overflow: hidden;

  &__background {
    position: absolute;
    inset: 0;
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: blur(4px);
    }
  }

  &__content {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    width: 100%;
    z-index: 2;
    color: white;
  }

  &__left {
    position: relative;
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 40px 10px;
  }

  &__concert-image {
    max-height: 75vh;
    border-radius: 5px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  }

  &__descr {
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 75%;
    height: 30%;
    padding: 16px;

    font-size: 14px;
    border-radius: 8px;
    background: rgba(0, 0, 0, 0.5);
  }

  &__right {
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
  }
}
</style>
