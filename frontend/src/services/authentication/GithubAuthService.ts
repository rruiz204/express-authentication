import Options from "../../utils/Options";
import Fetcher, { FetcherFactory } from "../../utils/Fetcher";
import { GITHUB_CLIENT_ID } from "../../env";
import { AuthDataDTO } from "../../dto/AuthenticationDTO";
import { type ISocialAuthService } from "./IAuthService";

const redirect = (): void => {
  const scopes = "scope=user";
  const params = `client_id=${GITHUB_CLIENT_ID}&${scopes}`;

  const url = "https://github.com/login/oauth/authorize?" + params;
  window.location.assign(url);
};

const login = async (code: string) => {
  const body = { code, strategy: "github" };
  const options = new Options({}).setMethod("POST").setBody(body).getOptions();
  const fetcher = FetcherFactory("/auth/social", options);
  return await Fetcher<AuthDataDTO>(fetcher);
};

const GithubAuthService: ISocialAuthService<string> = { redirect, login };
export default GithubAuthService