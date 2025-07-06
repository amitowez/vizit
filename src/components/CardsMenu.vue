<template>
  <div class="cards-menu">
    <div class="cards-menu__title">Репертуар</div>
    <ul class="cards-menu__list">
      <li
        v-for="concert in concerts"
        :key="concert.id"
        class="cards-menu__item"
        :class="{
          'cards-menu__item--active': concert.id === selectedConcertId,
        }"
        @click="onSelectConcert(concert)"
      >
        <div class="cards-menu__item-title">
          {{ concert.title }}
        </div>
        <img
          class="cards-menu__item-image"
          :src="concert.image"
          alt="Concert image"
        />
      </li>
    </ul>
    <div class="cards-menu__controls">
      <button class="cards-menu__btn">Назад</button>
      <button class="cards-menu__btn">Далее</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
defineProps({
  concerts: Array,
  selectedConcertId: Number,
});
const emits = defineEmits(["select"]);

function onSelectConcert(concert) {
  emits("select", concert);
}
</script>

<style lang="scss" scoped>
.cards-menu {
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: 15px;

  background-color: #1e1d1b;
  border-radius: 8px;

  &__title {
    flex: 0 0 auto;
    margin-bottom: 10px;
    font-size: 18px;
    text-align: center;
  }

  &__list {
    flex: 1 1 auto;
    display: flex;
    gap: 10px;

    width: 100%;

    list-style: none;
    padding: 0;
    margin: 0;
    margin-bottom: 20px;
  }

  &__item {
    position: relative;
    flex: 1 1 0;
    min-width: 0;
    overflow: hidden;

    cursor: pointer;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    transition: background 0.2s;

    &--active,
    &:hover {
      background: rgba(0, 0, 0, 0.8);
    }

    &:hover & {
      &-image {
        filter: blur(0px);
      }
    }

    &--active & {
      &-image {
        filter: blur(0px);
      }
    }

    &--active &-title {
      transform: translateY(100%);
      opacity: 0;
    }

    &-title {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;

      display: flex;
      align-items: center;
      justify-content: center;
      height: 62px;
      padding: 10px 10px;

      font-size: 14px;
      color: #fff;
      text-align: center;
      background: rgba(0, 0, 0, 0.5);
      transition: transform 0.6s ease, opacity 0.3s ease;
    }

    &-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
      filter: blur(2px);
      transition: filter 0.2s;
    }
  }

  &__controls {
    flex: 0 0 auto;
    width: 100%;
    padding: 0 10px 0;

    display: flex;
    justify-content: space-between;
  }

  &__btn {
    padding: 0 10px;

    font-size: 12px;
    border-radius: 4px;
    border: 1px solid #fff;

    &:hover {
      color: #000;
      border-color: #000;

      background-color: #fff;
    }
  }
}
</style>
