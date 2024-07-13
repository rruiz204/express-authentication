import Options from "../utils/Options";
import useFetch from "../hooks/useFetch";
import Fetcher from "../utils/Fetcher";
import Tokens from "../utils/Tokens";
import type { AuthDataDTO, LoginBodyDTO, RegisterBodyDTO } from "../dto/AuthenticationDTO";
import { type ILocalAuthService } from "./interfaces/IAuthService";

const options = new Options({}).setMethod("POST");

const login = () => {
  return useFetch<AuthDataDTO, LoginBodyDTO>(async (body) => {
    return await Fetcher("/auth/login", options.setBody(body).getOptions(), {
      response: Tokens.save
    });
  });
};

const register = () => {
  return useFetch<AuthDataDTO, RegisterBodyDTO>(async (body) => {
    return await Fetcher("/auth/register", options.setBody(body).getOptions(), {
      response: Tokens.save
    });
  });
};

const LocalAuthService: ILocalAuthService<LoginBodyDTO> = { login, register };
export default LocalAuthService;