interface IRedirectRoute {
  path: string;
  redirect: string;
}

const redirects: IRedirectRoute[] = [
  { path: "/", redirect: "/login" }
];

export default redirects;