import { defineStore } from "pinia";
import { Router } from "vue-router";
import useFetch from "../hooks/useFetch";
import LocalAuthService from "../services/authentication/LocalAuthService";
import { AuthDataDTO, RegisterBodyDTO } from "../dto/AuthenticationDTO";

const useRegisterStore = defineStore("register", () => {
  const { error, loading, execute, data } = useFetch<AuthDataDTO, RegisterBodyDTO>()

  async function register(body: RegisterBodyDTO, router: Router) {
    await execute(LocalAuthService.register, body);
    if (data.value) router.push({ name: "home" });
  };

  return { error, loading, register };
});

export default useRegisterStore;