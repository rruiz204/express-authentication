import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import Testing from "../views/Testing.vue";

interface IPublic {
  path: string;
  component: any;
  name: string;
}

const publics: IPublic[] = [
  { path: "/register", component: Register, name: "register" },
  { path: "/login", component: Login, name: "login" },
  { path: "/testing", component: Testing, name: "testing" },
];

export default publics;