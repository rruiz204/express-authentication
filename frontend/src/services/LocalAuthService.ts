import Options from "../utils/Options";
import Fetcher from "../utils/Fetcher";
import { LoginBodyDTO, RegisterBodyDTO, AuthResponseDTO } from "../dto/AuthenticationDTO";
import { type ILocalAuthService } from "./interfaces/IAuthService";

const endpoints = Object.freeze({
  login: "/auth/login",
  register: "/auth/register",
});

const options = new Options({}).setMethod("POST");

const login = async (body: LoginBodyDTO): Promise<AuthResponseDTO> => {
  return await Fetcher<AuthResponseDTO>(endpoints.login, options.setBody(body).getOptions())
};

const register = async (body: RegisterBodyDTO): Promise<AuthResponseDTO> => {
  return await Fetcher<AuthResponseDTO>(endpoints.register, options.setBody(body).getOptions())
};

const LocalAuthService: ILocalAuthService<LoginBodyDTO> = { login, register };
export default LocalAuthService;