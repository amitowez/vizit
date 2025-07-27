<template>
  <v-carousel
    style="border-radius: 12px; height: 100%"
    hide-delimiters
    :show-arrows="true"
    :continuous="true"
    v-model="currentSlide"
  >
    <v-carousel-item v-for="(chunk, index) in chunkedChats" :key="index">
      <template v-slot:default>
        <div class="carousel-item-content">
          <appTextBlock
            v-for="item in chunk"
            :key="item.question"
            :header="item.question"
            :text="item.answer"
            style="margin: 30px"
          />
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
import { ref, computed, onMounted, onUnmounted, defineProps } from "vue";
import appTextBlock from "@/components/common/appTextBlock.vue";

const props = defineProps({
  chats: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const currentSlide = ref(0);

const windowWidth = ref(0);

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

const itemsPerPage = computed(() => {
  if (windowWidth.value >= 1280) return 3;
  if (windowWidth.value >= 960) return 2;
  return 1;
});

const chunkedChats = computed(() => {
  const chunks = [];
  for (let i = 0; i < props.chats.length; i += itemsPerPage.value) {
    chunks.push(props.chats.slice(i, i + itemsPerPage.value));
  }
  return chunks;
});

onMounted(() => {
  updateWindowWidth();
  window.addEventListener("resize", updateWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWindowWidth);
});
</script>

<style>
.carousel-btn {
  background-color: rgba(0, 0, 0, 0.5) !important;
  border-radius: 50%;
}
.v-responsive__content {
  align-items: center;
  display: flex;
  flex-wrap: wrap;
}
.carousel-item-content {
  margin: 0 100px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  height: fit-content;
  width: fit-content;
}

.v-carousel {
  width: 100%;
}
</style>
