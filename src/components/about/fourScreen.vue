<template>
  <div class="four-about">
    <div
      class="four-about__title animate-container anim-1"
      :ref="(el) => setAnimElement(el, 0)"
    >
      <appTextBlock :header="$t('aboutText.hello8')" />
    </div>

    <appVideList :data="videos" />
  </div>
</template>

<script setup>
import appTextBlock from "@/components/common/appTextBlock.vue";
import appVideList from "../common/appVideList.vue";
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

const videos = [
  "https://rutube.ru/video/75549b09b9a1dd7b9aae41f37a3eeac2/",
  "https://rutube.ru/video/2ad8855a7cedc6443ab22829c00f7336/",
  "https://rutube.ru/video/a1e76dd8e60cd3d737d8b7bf954e0d6c/",
  "https://rutube.ru/video/0d1b9f55c428db58a6fe25fa415ccc5f/",
  "https://rutube.ru/video/0b1de8e4b3cdb7a1f0d0c7a13ef5b3a9/",
];
</script>
<style lang="scss">
.four-about {
  padding: 50px;
  @media (max-width: 500px) {
    padding: 15px;
  }
  &__title {
    margin-bottom: 30px;
    @media (max-width: 500px) {
      margin-bottom: 15px;
    }
  }
}
</style>
