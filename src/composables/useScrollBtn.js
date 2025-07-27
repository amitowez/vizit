import { onMounted, onUnmounted, ref } from "vue";

export function useScrollBtn() {
  const currentSectionIndex = ref(0);
  const viewportHeight = ref("100vh");

  onMounted(() => {
    const buttons = document.querySelectorAll(".scroll-btn");
    const sections = document.querySelectorAll("section");
    const viewport =
      document.querySelector(".viewport-container") || document.documentElement;

    if (!sections.length || !buttons.length) {
      return;
    }

    buttons.forEach((button, index) => {
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        const nextSection = sections[index + 1];
        if (nextSection) {
          const headerOffset = 64;
          const elementPosition = nextSection.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });
    });

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px 0px 0px",
      threshold: 0.4,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Array.from(sections).indexOf(entry.target);
          if (index !== -1) {
            currentSectionIndex.value = index;
            const sectionHeight = entry.target.offsetHeight;
            viewport.style.height = `${sectionHeight}px`;
            viewportHeight.value = `${sectionHeight}px`;
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });

    onUnmounted(() => {
      sections.forEach((section) => observer.unobserve(section));
      viewport.style.height = "100vh";
    });
  });

  return {
    currentSectionIndex,
    viewportHeight,
  };
}
