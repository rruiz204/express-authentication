import { defineStore } from "pinia";
import useFetch from "../hooks/useFetch";
import { AuthDataDTO } from "../dto/AuthenticationDTO";
import Tokens from "../utils/Tokens";
import LocalAuthService from "../services/authentication/LocalAuthService";
import GoogleAuthService from "../services/authentication/GoogleAuthService";
import GithubAuthService from "../services/authentication/GithubAuthService";

type AuthServiceType = "local" | "google" | "github";
const services = {
  local: LocalAuthService,
  github: GithubAuthService,
  google: GoogleAuthService,
};

const useLoginStore = defineStore("login", () => {
  const { error, loading, execute, data } = useFetch<AuthDataDTO, any>()

  async function login(body: any) {
    const service = services[localStorage.getItem("social_provider") as AuthServiceType];
    await execute(service.login, body);
    if (data.value) Tokens.save(data.value);
  };

  function redirect(service: AuthServiceType) {
    if (service == "local") return;
    setProvider(service);
    services[service].redirect();
  };

  function setProvider(service: AuthServiceType) {
    localStorage.setItem("social_provider", service);
  };

  return { error, loading, login, redirect, setProvider };
});

export default useLoginStore;