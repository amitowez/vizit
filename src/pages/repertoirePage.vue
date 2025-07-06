<template>
  <div class="repertoire">
    <div class="repertoire__background">
      <img :src="currentBackground" alt="Concert background" />
    </div>

    <div class="repertoire__content">
      <div class="repertoire__left">
        <div class="repertoire__concert-image">
          <img :src="selectedConcert.image" alt="Concert image" />
        </div>
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
    description: "Описание концерта №1",
    background: bg1,
    image: musicians,
  },
  {
    id: 2,
    title: "Мадригалы",
    description: "Описание концерта №2",
    background: bg1,
    image: cardsharps,
  },
  {
    id: 3,
    title: "Эрос",
    description: "Описание концерта №3",
    background: bg1,
    image: venusVertical,
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
    left: 0;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 2;
    color: white;
  }

  &__left {
    width: 60%;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    padding: 40px;
  }

  &__concert-image {
    img {
      max-width: 100%;
      max-height: 50vh;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
    }
  }

  &__descr {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
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
