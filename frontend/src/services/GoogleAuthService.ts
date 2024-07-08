import Options from "../utils/Options";
import Fetcher from "../utils/Fetcher";
import { GOOGLE_CLIENT_ID } from "../env";
import { AuthResponseDTO } from "../dto/AuthenticationDTO";
import { type ISocialAuthService } from "./interfaces/IAuthService";

const redirect = (): void => {
  const scopes = "scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
  const responseType = "response_type=code";
  const redirectUri = "redirect_uri=http://localhost:5173/login";

  const params = `client_id=${GOOGLE_CLIENT_ID}&${scopes}&${responseType}&${redirectUri}`;
  const url = "https://accounts.google.com/o/oauth2/v2/auth?" + params;
  window.location.assign(url);
};

const login = async (code: string): Promise<AuthResponseDTO> => {
  const body = { code, strategy: "google" };
  const options = new Options({}).setMethod("POST").setBody(body).getOptions();
  return await Fetcher<AuthResponseDTO>("/auth/social", options);
};

const GoogleAuthService: ISocialAuthService<string> = { redirect, login };
export default GoogleAuthService;