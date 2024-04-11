import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";

const routes = [
  { path: "/", component: Home, name: "Home Page" }
]

const Router = createRouter({
  history: createWebHistory(),
  routes: routes
});

export default Router;