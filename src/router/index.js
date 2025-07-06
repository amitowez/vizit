import { createRouter, createWebHistory } from "vue-router";
import homePage from "@/pages/homePage.vue";
import repertoirePage from "@/pages/repertoirePage.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: homePage,
  },
  {
    path: "/repertoire",
    name: "repertoire",
    component: repertoirePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
