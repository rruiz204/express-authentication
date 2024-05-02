import { createRouter, createWebHistory } from "vue-router";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import AuthGuard from "./guards/AuthGuard";

const routes = [
  {
    path: "/", component: Landing,
    name: "Landing Page"
  },
  {
    path: "/login", component: Login,
    name: "Login Page", beforeEnter: [AuthGuard]
  },
  {
    path: "/register", component: Register,
    name: "Register Page", beforeEnter: [AuthGuard]
  }
]

const Router = createRouter({
  history: createWebHistory(),
  routes: routes
});

export default Router;