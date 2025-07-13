import { createRouter, createWebHistory } from "vue-router";
import homePage from "@/pages/homePage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: homePage,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
