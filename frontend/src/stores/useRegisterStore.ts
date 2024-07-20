import { defineStore } from "pinia";
import useFetch from "../hooks/useFetch";
import { AuthDataDTO, RegisterBodyDTO } from "../dto/AuthenticationDTO";
import LocalAuthService from "../services/authentication/LocalAuthService";

const useRegisterStore = defineStore("register", () => {
  const { error, loading, execute } = useFetch<AuthDataDTO, RegisterBodyDTO>()

  async function register(body: RegisterBodyDTO) {
    await execute(LocalAuthService.register, body);
  };

  return { error, loading, register };
});

export default useRegisterStore;