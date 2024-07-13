import { ref, Ref } from "vue";
import LocalAuthService from "../services/LocalAuthService";
import GoogleAuthService from "../services/GoogleAuthService";
import GithubAuthService from "../services/GithubAuthService";

type AuthService = "local" | "google" | "github";
const services = {
  local: LocalAuthService,
  github: GithubAuthService,
  google: GoogleAuthService
};

const AuthDirector = () => {
  const error: Ref<string | undefined> = ref();
  const loading: Ref<boolean> = ref(false);

  async function login(body: any) {
    const service = services[localStorage.getItem("social_provider") as AuthService];
    const hook = service.login();
    await hook.fetch(body);

    console.log(hook.data.value);
    error.value = hook.error.value;
    loading.value = hook.loading.value
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
export default AuthDirector;