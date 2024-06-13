import { IAuthResponse } from "../types/responses/auth";

const save = (response: IAuthResponse) => {
  const token: string = `${response.data?.type} ${response.data?.jwt}`;
  localStorage.setItem("api_token", token);
};

const get = () => {
  return localStorage.getItem("api_token");
};

const Tokens = { save, get };
export default Tokens;