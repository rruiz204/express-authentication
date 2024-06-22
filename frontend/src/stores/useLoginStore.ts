import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import AuthService from "../services/AuthService";
import Tokens from "../utils/Tokens";
import { LoginBodyDTO } from "../dto/AuthenticationDTO";

const useLoginStore = defineStore("login", () => {
  const error: Ref<string | undefined> = ref();

  async function login(body: LoginBodyDTO) {
    const response = await AuthService.login(body);

    error.value = response.error;
    if (response.data) Tokens.save(response);
  }

  return { error, login }
});

export default useLoginStore;