import { GITHUB_CLIENT_ID, GOOGLE_CLIENT_ID } from "../env";

const github = () => {
  const scopes = "scope=user";
  const params = `client_id=${GITHUB_CLIENT_ID}&${scopes}`;

  const url = "https://github.com/login/oauth/authorize?" + params;
  window.location.assign(url);
};

const google = () => {
  const scopes = "scope=https://www.googleapis.com/auth/userinfo.profile";
  const responseType = "response_type=code"
  const redirectUri = "redirect_uri=https://localhost:3000/api/auth/google";

  const params = `client_id=${GOOGLE_CLIENT_ID}&${scopes}&${responseType}&${redirectUri}`;
  const url = "https://accounts.google.com/o/oauth2/v2/auth?" + params
  window.location.assign(url);
};

export default Object.freeze({ github, google });