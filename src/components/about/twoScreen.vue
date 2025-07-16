<template>
  <div class="second-about">
    <div
      class="second-about__one animate-container anim-1"
      :ref="(el) => setAnimElement(el, 0)"
    >
      <appTextBlock :header="$t('aboutText.hello5')" />
    </div>
    <div
      class="second-about__two animate-container anim-2"
      :ref="(el) => setAnimElement(el, 1)"
    >
      <div class="second-about__two--element">
        <appTextBlock :header="$t('aboutText.hello6')" />
      </div>
    </div>
  </div>
</template>
<script setup>
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
</script>
<style lang="scss">
.second-about {
  padding: 50px;
  @media (max-width: 500px) {
    width: 100%;
    padding: 15px;
  }
  &__one {
    flex-direction: column;
    align-items: flex-start;
    display: flex;
    width: 30%;

    @media (max-width: 500px) {
      width: 100%;
      margin-bottom: 15px;
    }
  }
  &__two {
    flex-direction: column;
    align-items: center;
    display: flex;
    width: 100%;
    &--element {
      width: 30%;
      @media (max-width: 500px) {
        width: 100%;
      }
    }
  }
}
</style>
