import { AuthDataDTO } from "../dto/AuthenticationDTO";

const save = (response: AuthDataDTO) => {
  const token: string = `${response?.type} ${response?.jwt}`;
  localStorage.setItem("api_token", token);
};

const get = () => {
  return localStorage.getItem("api_token");
};

const Tokens = { save, get };
export default Tokens;