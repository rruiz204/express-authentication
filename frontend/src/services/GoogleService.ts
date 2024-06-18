import { GOOGLE_CLIENT_ID } from "../env";

class GoogleService {

  static redirect() {
    const scopes = "scope=https://www.googleapis.com/auth/userinfo.profile";
    const responseType = "response_type=token";
    const redirectUri = "redirect_uri=https://localhost:3000/api/auth/google";

    const params = `client_id=${GOOGLE_CLIENT_ID}&${scopes}&${responseType}&${redirectUri}`;
    const url = "https://accounts.google.com/o/oauth2/v2/auth?" + params;
    window.location.assign(url);
  }
}

export default GoogleService;