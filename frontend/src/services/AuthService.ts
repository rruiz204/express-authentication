import Options from "../utils/Options";
import Fetcher from "../utils/Fetcher";
import { ILoginBody, IRegisterBody } from "../types/bodies/auth";
import { IAuthResponse } from "../types/responses/auth";

const endpoints = Object.freeze({
  login: "/auth/login",
  register: "/auth/register",
});

const options = new Options({}).setMethod("POST");

const login = async (body: ILoginBody): Promise<IAuthResponse> => {
  return await Fetcher<IAuthResponse>(endpoints.login, options.setBody(body).getOptions())
};

const register = async (body: IRegisterBody): Promise<IAuthResponse> => {
  return await Fetcher<IAuthResponse>(endpoints.register, options.setBody(body).getOptions())
};

export default Object.freeze({ login, register });