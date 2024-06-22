import { GITHUB_CLIENT_ID } from "../env";
import { SocialService } from "./interfaces/SocialService";
import Options from "../utils/Options";
import Fetcher from "../utils/Fetcher";
import { AuthResponseDTO } from "../dto/AuthenticationDTO";

const login = async (code: string): Promise<AuthResponseDTO> => {
  const options = new Options({}).setMethod("POST").setBody({ code }).getOptions();
  return await Fetcher<AuthResponseDTO>("/auth/github", options);
};

const redirect = (): void => {
  const scopes = "scope=user";
  const params = `client_id=${GITHUB_CLIENT_ID}&${scopes}`;

  const url = "https://github.com/login/oauth/authorize?" + params;
  window.location.assign(url);
};

const GithubService: SocialService = { redirect, login };
export default GithubService;