<script setup>
import { defineProps } from "vue";
import VideoListItem from "./appVideo.vue";
defineProps({
  data: Object,
});
</script>

<template>
  <div class="video-list">
    <div class="video-list__list">
      <VideoListItem v-for="video in data" :key="video.url" :video="video" />
    </div>
  </div>
</template>

<style lang="scss">
.video-list {
  &__list {
    display: grid;
    gap: 24px;
    margin: 0 auto;
    grid-template-columns: repeat(3, 1fr);

    .video-player {
      height: 200px;
    }

    &:has(> :nth-child(2):last-child) {
      grid-template-columns: repeat(2, 1fr);

      .video-player {
        height: 300px;
      }
    }

    &:has(> :nth-child(1):last-child) {
      grid-template-columns: 1fr;

      .video-player {
        height: 600px;
      }
    }

    @media (max-width: 500px) {
      grid-template-columns: 1fr;

      .video-player {
        height: 200px;
      }
    }
  }
}
</style>
