<template>
  <div class="home-page">
    <!-- <app-carousel /> -->
    <div class="section section-1">
      <div class="content">
        <h1>Заголовок 1</h1>
        <p>Описание...</p>
      </div>
    </div>
    <div class="section section-2">
      <div class="content">
        <h2>Блок контента</h2>
        <p>Еще текст...</p>
      </div>
    </div>
    <div class="section section-3">
      <div class="content">
        <h2>И еще один блок</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
// import appCarousel from "@/components/appCarousel.vue";
</script>

<style scoped lang="scss">
.section {
  min-height: 100vh;
  width: 100%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;

  &-1 {
    background: url("@/assets/img/bg1.jpg") center center / cover no-repeat
      fixed;
  }

  &-2 {
    background: url("@/assets/img/bg2.jpg") center center / cover no-repeat
      fixed;
  }

  &-3 {
    background: url("@/assets/img/bg3.jpg") center center / cover no-repeat
      fixed;
  }
}

.content {
  z-index: 1;
  padding: 2rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 8px;
}
</style>
