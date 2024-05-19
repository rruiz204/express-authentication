import { createRouter, createWebHistory } from "vue-router";
import redirects from "./routes/redirects";
import publics from "./routes/publics";

const routes = [...redirects, ...publics];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;