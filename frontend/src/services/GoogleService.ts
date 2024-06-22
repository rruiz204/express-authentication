import { GOOGLE_CLIENT_ID } from "../env";
import SocialService from "./interfaces/SocialService";

class GoogleService extends SocialService {

  static login(): void {
    
  }

  static redirect(): void {
    const scopes = "scope=https://www.googleapis.com/auth/userinfo.profile";
    const responseType = "response_type=code";
    const redirectUri = "redirect_uri=http://localhost:5173/testing";

    const params = `client_id=${GOOGLE_CLIENT_ID}&${scopes}&${responseType}&${redirectUri}`;
    const url = "https://accounts.google.com/o/oauth2/v2/auth?" + params;
    window.location.assign(url);
  }

  static info(): void {
    console.log("you are using google service");
  }
}

export default GoogleService;