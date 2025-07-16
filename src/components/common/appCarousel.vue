<template>
  <v-carousel
    style="border-radius: 12px"
    hide-delimiters
    :show-arrows="true"
    cycle
    :interval="3000"
  >
    <v-carousel-item
      v-for="item in images"
      :key="item.img"
      :src="item.img"
      cover
    >
      <template v-slot:default>
        <div class="caption">
          {{ $t(item.caption) }}
        </div>
      </template>
    </v-carousel-item>

    <!-- Кастомные кнопки -->
    <template v-slot:prev="{ props }">
      <v-btn
        class="carousel-btn"
        icon="fa-chevron-circle-left"
        color="primary"
        @click="props.onClick"
      />
    </template>
    <template v-slot:next="{ props }">
      <v-btn
        class="carousel-btn"
        icon="fa-chevron-circle-right"
        color="primary"
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

<style lang="scss" scoped>
.caption {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  padding: 10px;
  font-size: 16px;
}

.carousel-btn {
  background-color: rgb(var(--v-theme-text-block-background), 0%) !important;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  color: rgb(var(--v-theme-text-block-background-accent)) !important;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
}
</style>
