import Options from "../utils/Options";
import Fetcher from "../utils/Fetcher";
import { GITHUB_CLIENT_ID } from "../env";
import { AuthResponseDTO } from "../dto/AuthenticationDTO";
import { type ISocialAuthService } from "./interfaces/IAuthService";

const redirect = (): void => {
  const scopes = "scope=user";
  const params = `client_id=${GITHUB_CLIENT_ID}&${scopes}`;

  const url = "https://github.com/login/oauth/authorize?" + params;
  window.location.assign(url);
};

const login = async (code: string): Promise<AuthResponseDTO> => {
  const body = { code, strategy: "github" };
  const options = new Options({}).setMethod("POST").setBody(body).getOptions();
  return await Fetcher<AuthResponseDTO>("/auth/social", options);
};

const GithubAuthService: ISocialAuthService<string> = { redirect, login };
export default GithubAuthService