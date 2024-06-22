import { defineStore } from "pinia";
import { SocialService } from "../services/interfaces/SocialService";
import GithubService from "../services/GithubService";
import GoogleService from "../services/GoogleService";
import { ref, Ref } from "vue";

interface IServices {
  github: SocialService;
  google: SocialService;
}

const useSocialStore = defineStore("social store", () => {
  const services = { github: GithubService, google: GoogleService };

  const loading: Ref<boolean> = ref(false);
  const error: Ref<string | undefined> = ref();

  function redirectToGithub() {
    localStorage.setItem("social_provider", "github");
    GithubService.redirect();
  }

  function redirectToGoogle() {
    localStorage.setItem("social_provider", "google");
    GoogleService.redirect();
  }

  async function login(code: string) {
    loading.value = true;
    const service = services[localStorage.getItem("social_provider") as keyof IServices];
    const response = await service.login(code);

    error.value = response.error;
    console.log(response.data);
    loading.value = false;
    //localStorage.removeItem("social_provider");
  }

  return { redirectToGithub, redirectToGoogle, login };
});

export default useSocialStore;