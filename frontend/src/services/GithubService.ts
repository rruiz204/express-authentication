import { GITHUB_CLIENT_ID } from "../env";

class GithubService {

  static redirect() {
    const scopes = "scope=user";
    const params = `client_id=${GITHUB_CLIENT_ID}&${scopes}`;

    const url = "https://github.com/login/oauth/authorize?" + params;
    window.location.assign(url);
  }
}

export default GithubService;