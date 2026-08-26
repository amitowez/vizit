import { ref, watch, onMounted, onUnmounted } from "vue";
import { useTheme } from "vuetify";

// Пасхалка: Alt+Enter (или пять быстрых нажатий на флерон в шапке)
// переключает сайт в тему «Будуар» и обратно.
export function useEros() {
  const theme = useTheme();
  const isEros = ref(false);
  const toastVisible = ref(false);
  let prevTheme = "dark";
  let prevTitle = null;
  let toastTimer = null;

  const setEros = (on) => {
    isEros.value = on;
    document.body.classList.toggle("eros-mode", on);
    clearTimeout(toastTimer);
    if (on) {
      prevTheme = theme.global.name.value;
      prevTitle = document.title;
      document.title = "Monte Verde · Salon d'Éros";
      theme.global.name.value = "eros";
      toastVisible.value = true;
      toastTimer = setTimeout(() => (toastVisible.value = false), 3200);
    } else {
      if (theme.global.name.value === "eros") {
        theme.global.name.value = prevTheme === "eros" ? "dark" : prevTheme;
      }
      if (prevTitle) document.title = prevTitle;
      toastVisible.value = false;
    }
  };

  const toggle = () => setEros(!isEros.value);

  const onKeydown = (e) => {
    if (e.altKey && e.key === "Enter") {
      e.preventDefault();
      toggle();
    }
  };

  // Если тему сменили другим способом (кнопкой солнце/луна) — выходим из будуара.
  watch(theme.global.name, (name) => {
    if (name !== "eros" && isEros.value) {
      isEros.value = false;
      document.body.classList.remove("eros-mode");
      if (prevTitle) document.title = prevTitle;
      toastVisible.value = false;
    }
  });

  onMounted(() => window.addEventListener("keydown", onKeydown));
  onUnmounted(() => {
    window.removeEventListener("keydown", onKeydown);
    clearTimeout(toastTimer);
    document.body.classList.remove("eros-mode");
  });

  return { isEros, toastVisible, toggle };
}
