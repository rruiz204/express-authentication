interface IRedirect {
  path: string;
  redirect: string;
}

const redirects: IRedirect[] = [
  { path: "/", redirect: "/login" }
];

export default redirects;