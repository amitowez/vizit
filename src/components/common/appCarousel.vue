<template>
  <v-carousel
    style="border-radius: 12px"
    hide-delimiters
    :show-arrows="true"
    cycle
    :interval="4000"
  >
    <v-carousel-item
      v-for="item in images"
      :key="item.img"
      :src="item.img"
      cover
    >
      <template v-slot:default>
        <div class="carousel-caption">
          {{ $t(item.caption) }}
        </div>
      </template>
    </v-carousel-item>

    <template v-slot:prev="{ props }">
      <v-btn
        class="carousel-btn"
        icon="fa-chevron-circle-left"
        @click="props.onClick"
      />
    </template>
    <template v-slot:next="{ props }">
      <v-btn
        class="carousel-btn"
        icon="fa-chevron-circle-right"
        @click="props.onClick"
      />
    </template>
  </v-carousel>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  images: {
    type: Array,
    required: true,
    default: () => [],
  },
});
</script>

<style lang="scss">
.carousel-caption {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 16px;
}
</style>
