import { createRouter, createWebHistory } from "vue-router";
import redirects from "./routes/redirects";
import publics from "./routes/publics";
import privates from "./routes/privates";

const routes = [...redirects, ...publics, ...privates];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

export default router;