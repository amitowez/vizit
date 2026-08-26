<template>
  <div class="six-about">
    <div
      class="animate-container anim-1"
      :ref="(el) => setAnimElement(el, 0)"
    >
      <appTextBlock :header="$t('piano.lead')" />
    </div>
    <div
      class="animate-container anim-2 six-about__piano"
      :ref="(el) => setAnimElement(el, 1)"
    >
      <appPiano />
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import appTextBlock from "@/components/common/appTextBlock.vue";
import appPiano from "@/components/common/appPiano.vue";
import { useAnim } from "@/composables/useAnim";

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
.six-about {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 26px;
  padding: 40px 50px 70px;

  &__piano {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  @media (max-width: 640px) {
    padding: 20px 12px;
    gap: 16px;
  }
}
</style>
