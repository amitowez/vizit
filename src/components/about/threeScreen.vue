<template>
  <div class="three-screen">
    <div class="three-screen__carousel">
      <appCarousel style="height: 100%" :images="images" />
    </div>
    <div
      class="three-screen__text animate-container anim-1"
      :ref="(el) => setAnimElement(el, 0)"
    >
      <appTextBlock :header="$t('aboutText.hello7')" />
    </div>
  </div>
</template>
<script setup>
import appCarousel from "@/components/common/appCarousel.vue";
import appTextBlock from "@/components/common/appTextBlock.vue";
import { useAnim } from "@/composables/useAnim";
import { defineProps } from "vue";

const props = defineProps({
  scroll: Object,
  sectionIndex: Number,
});

const { setAnimElement } = useAnim({
  currentSectionIndex: props.scroll.currentSectionIndex,
  sectionIndex: props.sectionIndex,
});
const images = [
  {
    img: require("@/assets/img/aboutPeople/Grebenykov.webp"),
    caption: "people.description.grebenykov",
  },
  {
    img: require("@/assets/img/aboutPeople/Grebenykova.webp"),
    caption: "people.description.grebenykova",
  },
  {
    img: require("@/assets/img/aboutPeople/Melnikov.webp"),
    caption: "people.description.melnikov",
  },
  {
    img: require("@/assets/img/aboutPeople/Gordon.webp"),
    caption: "people.description.gordon",
  },
];
</script>
<style lang="scss">
.three-screen {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 50px;
  &__carousel {
    width: 50%;
    height: 100%;
    padding: 15px;
    @media (max-width: 500px) {
      width: 100%;
    }
  }
  &__text {
    width: 100%;
    @media (max-width: 500px) {
      display: none;
    }
  }
}
</style>
