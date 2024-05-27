import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import Fetcher from "../utils/fetcher";
import Options from "../utils/options";
import Tokens from "../utils/tokens";
import { IAuthBody } from "../types/bodies/auth";
import { IAuthResponse } from "../types/responses/auth";

const useAuthStore = defineStore("authentication", () => {
  const error: Ref<string | undefined> = ref();

  async function auth(endpoint: string, body: IAuthBody) {
    const options = new Options <IAuthBody> ("POST", body).getOptions();
    const response = await Fetcher <IAuthResponse> (endpoint, options);

    error.value = response.error;
    if (response.data) Tokens.save(response.data);
  }

  return { error, auth }
});

export default useAuthStore;