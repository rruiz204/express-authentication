import { IAuthData } from "../types/responses/auth";

const save = (data: IAuthData) => {
  const token: string = `${data.type} ${data.jwt}`;
  localStorage.setItem("api_token", token);
};

const get = () => {
  return localStorage.getItem("api_token");
};

const Tokens = { save, get };
export default Tokens;