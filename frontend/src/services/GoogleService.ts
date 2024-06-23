import { GOOGLE_CLIENT_ID } from "../env";
import { SocialService } from "./interfaces/SocialService";
import Options from "../utils/Options";
import Fetcher from "../utils/Fetcher";
import { AuthResponseDTO } from "../dto/AuthenticationDTO";

const login = async (code: string) => {
  const options = new Options({}).setMethod("POST").setBody({ code }).getOptions();
  return await Fetcher<AuthResponseDTO>("/auth/google", options);
};

const redirect = (): void => {
  const scopes = "scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
  const responseType = "response_type=code";
  const redirectUri = "redirect_uri=http://localhost:5173/login";

  const params = `client_id=${GOOGLE_CLIENT_ID}&${scopes}&${responseType}&${redirectUri}`;
  const url = "https://accounts.google.com/o/oauth2/v2/auth?" + params;
  window.location.assign(url);
};

const GoogleService: SocialService = { redirect, login };
export default GoogleService;