import Register from "../views/Register.vue";
import Login from "../views/Login.vue";

interface IPublic {
  path: string;
  component: any;
  name: string;
}

const publics: IPublic[] = [
  { path: "/register", component: Register, name: "register" },
  { path: "/login", component: Login, name: "login" }
];

export default publics;