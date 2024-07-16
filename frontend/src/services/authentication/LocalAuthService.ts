import Options from "../../utils/Options";
import Fetcher, { FetcherFactory } from "../../utils/Fetcher";
import Tokens from "../../utils/Tokens";
import type { AuthDataDTO, LoginBodyDTO, RegisterBodyDTO } from "../../dto/AuthenticationDTO";
import { type ILocalAuthService } from "./IAuthService";

const options = new Options({}).setMethod("POST");

const login = async (body: LoginBodyDTO) => {
  const fetcher = FetcherFactory("/auth/login", options.setBody(body).getOptions());
  return await Fetcher<AuthDataDTO>(fetcher);
};

const register = async (body: RegisterBodyDTO) => {
  const fetcher = FetcherFactory("/auth/register", options.setBody(body).getOptions());
  const response = await Fetcher<AuthDataDTO>(fetcher);

  if (response.data) Tokens.save(response.data);
  return response;
};

const LocalAuthService: ILocalAuthService<LoginBodyDTO> = { login, register };
export default LocalAuthService;