import { GITHUB_CLIENT_ID } from "../env";
import SocialService from "./interfaces/SocialService";

class GithubService extends SocialService {

  static login(): void {
    
  }

  static redirect(): void {
    const scopes = "scope=user";
    const params = `client_id=${GITHUB_CLIENT_ID}&${scopes}`;

    const url = "https://github.com/login/oauth/authorize?" + params;
    window.location.assign(url);
  }

  static info(): void {
    console.log("you are using github service");
  }
}

export default GithubService;