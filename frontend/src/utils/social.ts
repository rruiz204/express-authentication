import { GITHUB_CLIENT_ID, GOOGLE_CLIENT_ID } from "../env";

const github = () => {
  const params = `client_id=${GITHUB_CLIENT_ID}&scope=user`;
  const url = "https://github.com/login/oauth/authorize?" + params;
  window.location.assign(url);
};

const google = () => {
  const scopes = "https://www.googleapis.com/auth/userinfo.profile";
  const redirect_uri = "https://localhost:3000/api/auth/google";

  const params = `client_id=${GOOGLE_CLIENT_ID}&scope=${scopes}&response_type=code&redirect_uri=${redirect_uri}`;
  const url = "https://accounts.google.com/o/oauth2/v2/auth?" + params
  window.location.assign(url);
};

const Social = { github, google }
export default Social;