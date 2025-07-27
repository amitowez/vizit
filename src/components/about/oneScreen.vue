<template>
  <div class="first-about first-about__1">
    <div
      class="first-about__element animate-container anim-1"
      :ref="(el) => setAnimElement(el, 0)"
    >
      <appTextBlock :header="$t('aboutText.hello1')" />
    </div>
    <div
      class="first-about__element--1 animate-container anim-2"
      :ref="(el) => setAnimElement(el, 1)"
    >
      <appTextBlock :header="$t('aboutText.hello2')" />
    </div>
    <div
      class="first-about__element--2 animate-container anim-3"
      :ref="(el) => setAnimElement(el, 2)"
    >
      <appTextBlock :header="$t('aboutText.hello3')" />
    </div>
  </div>
  <div
    class="first-about first-about__2 animate-container anim-4"
    :ref="(el) => setAnimElement(el, 3)"
  >
    <appTextBlock :header="$t('aboutText.hello4')" />
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import appTextBlock from "@/components/common/appTextBlock.vue";
import { useAnim } from "@/composables/useAnim";

const props = defineProps({
  scroll: Object,
  sectionIndex: Number,
});

const { setAnimElement } = useAnim({
  currentSectionIndex: props.scroll.currentSectionIndex,
  sectionIndex: props.sectionIndex,
});

// onMounted(async () => {
//   await nextTick();
// });
</script>

<style lang="scss">
.first-about {
  position: relative;
  z-index: 2;
  &__1 {
    display: block;
    padding: 50px;
    @media (max-width: 500px) {
      padding: 25px;
    }
  }
  &__2 {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
    @media (max-width: 500px) {
      padding: 10px 25px;
    }
  }
  &__element {
    display: flex;
    margin-bottom: 30px;
    @media (max-width: 500px) {
      margin-bottom: 10px;
    }
    &--1 {
      display: flex;
      justify-content: center;
      margin-bottom: 30px;
      @media (max-width: 500px) {
        margin-bottom: 10px;
      }
    }
    &--2 {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
