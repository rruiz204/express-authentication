import { defineStore } from "pinia";
import GithubService from "../services/GithubService";
import GoogleService from "../services/GoogleService";
import { ref, Ref } from "vue";

type Service = "github" | "google";

const services = {
  github: GithubService,
  google: GoogleService
};

const useSocialStore = defineStore("social store", () => {
  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | undefined> = ref();

  function redirect(service: Service) {
    localStorage.setItem("social_provider", service);
    services[service].redirect();
  }

  async function login(code: string) {
    loading.value = true;
    const service = services[localStorage.getItem("social_provider") as Service];
    const response = await service.login(code);

    error.value = response.error;
    console.log(response.data);
    loading.value = false;
    //localStorage.removeItem("social_provider");
  }

  return { redirect, login };
});

export default useSocialStore;