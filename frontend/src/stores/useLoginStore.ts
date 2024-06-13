import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import AuthService from "../services/AuthService";
import Tokens from "../utils/Tokens";
import { ILoginBody } from "../types/bodies/auth";

const useLoginStore = defineStore("login", () => {
  const error: Ref<string | undefined> = ref();

  async function login(body: ILoginBody) {
    const response = await AuthService.login(body);

    error.value = response.error;
    if (response.data) Tokens.save(response);
  }

  return { error, login }
});

export default useLoginStore;