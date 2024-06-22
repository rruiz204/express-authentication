import { defineStore } from "pinia";
import SocialService from "../services/interfaces/SocialService";
import GithubService from "../services/GithubService";
import GoogleService from "../services/GoogleService";

interface IServices {
  github: SocialService;
  google: SocialService;
}

const useSocialStore = defineStore("social store", () => {
  const services = { github: GithubService, google: GoogleService };

  function redirectToGithub() {
    localStorage.setItem("social_provider", "github");
    GithubService.redirect();
  }

  function redirectToGoogle() {
    localStorage.setItem("social_provider", "google");
    GoogleService.redirect();
  }

  function login() {
    const service = services[localStorage.getItem("social_provider") as keyof IServices];
    service.info();
    //localStorage.removeItem("social_provider");
  }

  return { redirectToGithub, redirectToGoogle, login };
});

export default useSocialStore;