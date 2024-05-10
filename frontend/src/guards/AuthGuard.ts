import { RouteLocationNormalized, NavigationGuardNext } from "vue-router";

const AuthGuard = (
  to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext
) => {
  console.log(`To: ${to.path}`);
  console.log(`From: ${from.path}`);
  next();
}
export default AuthGuard;