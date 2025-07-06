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
        <div class="repertoire__description">
          <h2>{{ selectedConcert.title }}</h2>
          <p>{{ selectedConcert.description }}</p>
        </div>
      </div>

      <div class="repertoire__right">
        <div class="repertoire__menu">
          <ul class="repertoire__menu-list">
            <li
              v-for="concert in concerts"
              :key="concert.id"
              class="repertoire__menu-item"
              :class="{
                'repertoire__menu-item--active':
                  concert.id === selectedConcert.id,
              }"
              @click="selectConcert(concert)"
            >
              {{ concert.title }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import bg1 from "@/assets/bg1.jpg";
import musicians from "@/assets/musicians.jpg";
import cardsharps from "@/assets/cardsharps.jpg";
import venusHorizontal from "@/assets/venusHorizontal.jpg";

const concerts = ref([
  {
    id: 1,
    title: "Концерт №1",
    description: "Описание концерта №1",
    background: bg1,
    image: musicians,
  },
  {
    id: 2,
    title: "Концерт №2",
    description: "Описание концерта №2",
    background: bg1,
    image: cardsharps,
  },
  {
    id: 3,
    title: "Концерт №3",
    description: "Описание концерта №3",
    background: bg1,
    image: venusHorizontal,
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
  height: calc(100vh - 64px - 64px); // подстрой под свои шапку/футер
  overflow: hidden;

  &__background {
    position: absolute;
    inset: 0;
    z-index: 1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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
    justify-content: center;
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

  &__description {
    margin-top: 20px;
    background: rgba(0, 0, 0, 0.5);
    padding: 16px;
    border-radius: 8px;
  }

  &__right {
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
  }

  &__menu {
    &-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    &-item {
      cursor: pointer;
      padding: 12px 16px;
      margin-bottom: 8px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 4px;
      transition: background 0.2s;

      &--active,
      &:hover {
        background: rgba(0, 0, 0, 0.8);
      }
    }
  }
}
</style>
