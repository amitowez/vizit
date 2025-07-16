import { watch, nextTick, ref } from "vue";

export function useAnim(params) {
  const animElements = ref([]);

  const setAnimElement = (el, index) => {
    if (el) {
      animElements.value[index] = el;
    }
  };
  watch(
    params.currentSectionIndex,
    async (newVal) => {
      await nextTick();
      if (params.sectionIndex === newVal) {
        animElements.value.forEach((el, index) => {
          if (el) {
            setTimeout(() => {
              el.classList.add("animate");
            }, index * 200);
          }
        });
      } else {
        animElements.value.forEach((el, index) => {
          if (el) {
            setTimeout(() => {
              el.classList.remove("animate");
            }, index * 200);
          }
        });
      }
    },
    { immediate: true }
  );

  return { setAnimElement };
}
