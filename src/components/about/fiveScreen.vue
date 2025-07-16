<template>
  <div class="five-about">
    <div class="animate-container anim-1" :ref="(el) => setAnimElement(el, 0)">
      <appTextBlock :header="$t('aboutText.hello9')" />
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
.five-about {
  padding: 50px;
  @media (max-width: 500px) {
    padding: 15px;
  }
}
</style>
