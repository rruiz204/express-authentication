import Home from "../views/Home.vue";

interface IPrivateRoute {
  path: string;
  component: any;
  name: string;
};

const privates: IPrivateRoute[] = [
  { path: "/home", component: Home, name: "home" }
];

export default privates;