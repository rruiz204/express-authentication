import { defineStore } from "pinia";
import { Router } from "vue-router";
import useFetch from "../hooks/useFetch";
import Tokens from "../utils/Tokens";
import LocalAuthService from "../services/authentication/LocalAuthService";
import GoogleAuthService from "../services/authentication/GoogleAuthService";
import GithubAuthService from "../services/authentication/GithubAuthService";
import { AuthDataDTO } from "../dto/AuthenticationDTO";

type AuthServiceType = "local" | "google" | "github";
const services = {
  local: LocalAuthService,
  github: GithubAuthService,
  google: GoogleAuthService,
};

const useLoginStore = defineStore("login", () => {
  const { error, loading, execute, data } = useFetch<AuthDataDTO, any>()

  async function login(body: any, router: Router) {
    const service = services[localStorage.getItem("social_provider") as AuthServiceType];
    await execute(service.login, body);

    if (data.value) {
      Tokens.save(data.value);
      router.push({ name: "home" });
      localStorage.removeItem("social_provider");
    };
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