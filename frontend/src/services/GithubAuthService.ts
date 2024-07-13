import Options from "../utils/Options";
import useFetch from "../hooks/useFetch";
import Fetcher from "../utils/Fetcher";
import Tokens from "../utils/Tokens";
import { GITHUB_CLIENT_ID } from "../env";
import { AuthDataDTO } from "../dto/AuthenticationDTO";
import { type ISocialAuthService } from "./interfaces/IAuthService";

const redirect = (): void => {
  const scopes = "scope=user";
  const params = `client_id=${GITHUB_CLIENT_ID}&${scopes}`;

  const url = "https://github.com/login/oauth/authorize?" + params;
  window.location.assign(url);
};

const login = () => {
  return useFetch<AuthDataDTO, string>(async (code) => {
    const body = { code, strategy: "github" };
    const options = new Options({}).setMethod("POST").setBody(body).getOptions();
    return await Fetcher<AuthDataDTO>("/auth/social", options, {
      response: Tokens.save
    });
  });
};

const GithubAuthService: ISocialAuthService<string> = { redirect, login };
export default GithubAuthService