import { AuthResponseDTO } from "../dto/AuthenticationDTO";

const save = (response: AuthResponseDTO) => {
  const token: string = `${response.data?.type} ${response.data?.jwt}`;
  localStorage.setItem("api_token", token);
};

const get = () => {
  return localStorage.getItem("api_token");
};

const Tokens = { save, get };
export default Tokens;