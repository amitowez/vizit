<template>
  <v-carousel>
    <v-carousel-item
      v-for="(item, index) in images"
      :key="index"
      :src="item"
      cover
    />
  </v-carousel>
</template>

<script setup>
import { ref } from "vue";

// Заглушки — массив с URL картинок
const images = ref([
  "https://cdn.vuetifyjs.com/images/cards/docks.jpg",
  "https://cdn.vuetifyjs.com/images/cards/hotel.jpg",
  "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
]);
</script>

<!-- <style lang="scss" scoped>

</style> -->
