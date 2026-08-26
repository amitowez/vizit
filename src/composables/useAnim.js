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
      // Появившись один раз, блоки остаются видимыми — класс не снимаем
      if (params.sectionIndex === newVal) {
        animElements.value.forEach((el, index) => {
          if (el) {
            setTimeout(() => {
              el.classList.add("animate");
            }, index * 200);
          }
        });
      }
    },
    { immediate: true }
  );

  return { setAnimElement };
}
