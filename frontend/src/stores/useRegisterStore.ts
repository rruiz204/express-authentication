import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import AuthService from "../services/AuthService";
import Tokens from "../utils/Tokens";
import { IRegisterBody } from "../types/bodies/auth";

const useRegisterStore = defineStore("register", () => {
  const error: Ref<string | undefined> = ref();

  async function register(body: IRegisterBody) {
    const response = await AuthService.register(body);

    error.value = response.error;
    if (response.data) Tokens.save(response);
  }

  return { error, register }
});

export default useRegisterStore;