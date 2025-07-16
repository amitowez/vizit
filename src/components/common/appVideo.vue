<script setup>
import { computed, defineProps } from "vue";
const props = defineProps({
  video: String,
});

const handleError = () => {
  console.error(
    "Ошибка загрузки видео. Проверьте ссылку или доступность платформы."
  );
};
const embedUrl = computed(() => {
  const url = props.video;
  const rutubeRegex =
    /^(?:https?:\/\/)?(?:www\.)?rutube\.ru\/video\/([a-zA-Z0-9_-]+)/;
  const rutubeMatch = rutubeRegex.exec(url);
  if (rutubeMatch?.[1]) {
    return `https://rutube.ru/embed/${rutubeMatch[1]}`;
  }
  return "";
});
console.log(embedUrl);
</script>

<template>
  <div class="video-player">
    <iframe
      :src="embedUrl"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      class="video-player__iframe"
      @error="handleError"
    ></iframe>
  </div>
</template>

<style lang="scss">
.video-player {
  position: relative;
  width: 100%;

  &__iframe {
    border-radius: 12px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
}
</style>
