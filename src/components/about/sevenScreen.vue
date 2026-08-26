<template>
  <div class="colophon">
    <div
      class="animate-container anim-1 colophon__ornament"
      :ref="(el) => setAnimElement(el, 0)"
      aria-hidden="true"
    >
      ❦
    </div>
    <div class="animate-container anim-2" :ref="(el) => setAnimElement(el, 1)">
      <appTextBlock :header="$t('aboutText.hello7')" />
    </div>
    <div
      class="animate-container anim-3 colophon__brand"
      :ref="(el) => setAnimElement(el, 2)"
    >
      {{ $t("appTitle") }}
    </div>
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
</script>

<style lang="scss">
.colophon {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 40px;
  text-align: center;

  &__ornament {
    font-size: 46px;
    color: rgb(var(--v-theme-gold));
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }

  &__brand {
    font-family: "Forum", "Georgia", serif;
    font-size: 34px;
    letter-spacing: 0.32em;
    text-indent: 0.32em;
    text-transform: uppercase;
    color: #f0e6cc;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 500px) {
    gap: 20px;
    padding: 20px;

    &__brand {
      font-size: 22px;
    }
  }
}
</style>
