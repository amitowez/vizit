import { createRouter, createWebHistory } from "vue-router";
import aboutPage from "@/pages/aboutPage.vue";
import repertoirePage from "@/pages/repertoirePage.vue";
import contactPage from "@/pages/contactPage.vue";
const routes = [
  {
    path: "/about",
    name: "about",
    component: aboutPage,
  },
  {
    path: "/repertoire",
    name: "repertoire",
    component: repertoirePage,
  },
  {
    path: "/contact",
    name: "contact",
    component: contactPage,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/about",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
