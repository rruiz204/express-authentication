import Fetcher from "../utils/fetcher";
import Options from "../types/utils/fetcher";
import { IRegisterResponse, ILoginResponse } from "../types/responses/auth";
import { IRegisterBody, ILoginBody } from "../types/bodies/auth";

import { BASE_URL } from "../constant";
const AUTH_URL = BASE_URL + "/auth";

const register = async (body: IRegisterBody) => {
  const URL = AUTH_URL + "/register";

  const options: Options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body
  };

  return await Fetcher<IRegisterResponse>(URL, options);
}

const login = async (body: ILoginBody) => {
  const URL = AUTH_URL + "/login";
  
  const options: Options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body
  };

  return await Fetcher<ILoginResponse>(URL, options);
}

const AuthService = { register, login }
export default AuthService;
