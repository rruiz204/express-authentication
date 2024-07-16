import useFetch from "../../hooks/useFetch";
import { AuthDataDTO } from "../../dto/AuthenticationDTO";
import Tokens from "../../utils/Tokens";
import LocalAuthService from "./LocalAuthService";
import GoogleAuthService from "./GoogleAuthService";
import GithubAuthService from "./GithubAuthService";

type AuthService = "local" | "google" | "github";
const services = {
  local: LocalAuthService,
  github: GithubAuthService,
  google: GoogleAuthService
};

const AuthContext = () => {
  const { error, data, loading, execute } = useFetch<AuthDataDTO, any>();

  async function login(body: any) {
    const service = services[localStorage.getItem("social_provider") as AuthService];
    await execute(service.login, body);
    if (data.value) Tokens.save(data.value);
  };

  function redirect(service: AuthService) {
    if (!(service == "local")) {
      setService(service);
      services[service].redirect();
    };
  };

  function setService(service: AuthService) {
    localStorage.setItem("social_provider", service);
  };

  return { login, error, loading, redirect, setService };
};
export default AuthContext;