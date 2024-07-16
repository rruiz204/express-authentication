import Options from "../../utils/Options";
import Fetcher, { FetcherFactory } from "../../utils/Fetcher";
import { GOOGLE_CLIENT_ID } from "../../env";
import { AuthDataDTO } from "../../dto/AuthenticationDTO";
import { type ISocialAuthService } from "./IAuthService";

const redirect = (): void => {
  const scopes = "scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email";
  const responseType = "response_type=code";
  const redirectUri = "redirect_uri=http://localhost:5173/login";

  const params = `client_id=${GOOGLE_CLIENT_ID}&${scopes}&${responseType}&${redirectUri}`;
  const url = "https://accounts.google.com/o/oauth2/v2/auth?" + params;
  window.location.assign(url);
};

const login = async (code: string) => {
  const body = { code, strategy: "google" };
  const options = new Options({}).setMethod("POST").setBody(body).getOptions();
  const fetcher = FetcherFactory("/auth/social", options);
  return await Fetcher<AuthDataDTO>(fetcher);
};

const GoogleAuthService: ISocialAuthService<string> = { redirect, login };
export default GoogleAuthService;