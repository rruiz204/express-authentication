import { describe, test, expect, vi, afterAll } from "vitest";
import GithubStrategy from "../../../services/authentication/GithubStrategy";
import GoogleStrategy from "../../../services/authentication/GoogleStrategy";
import SocialAuthService from "../../../services/authentication/SocialAuthService";
import UserFactory from "../../../database/factories/UserFactory";

describe("social auth service", async () => {
  const user = {
    ...await UserFactory({}),
    password: null,
    github_id: null,
    google_id: null,
  };

  const { username, email, github_id, google_id } = user;

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("", async () => {
    vi.spyOn(GithubStrategy, "request").mockResolvedValue({ username, email, id: github_id });
    const GithubSpy = vi.spyOn(GithubStrategy, "login").mockResolvedValue({ ...user, github_id: "github id" });
    const GoogleSpy = vi.spyOn(GoogleStrategy, "login").mockResolvedValue({ ...user, google_id: "google id" });

    await SocialAuthService.login({ code: "github code", strategy: "github" });
    expect(GithubSpy).toHaveBeenCalled();
    expect(GoogleSpy).not.toHaveBeenCalled();
  });

  test("", async () => {
    vi.spyOn(GoogleStrategy, "request").mockResolvedValue({ username, email, id: google_id });
    const GithubSpy = vi.spyOn(GithubStrategy, "login").mockResolvedValue({ ...user, github_id: "github id" });
    const GoogleSpy = vi.spyOn(GoogleStrategy, "login").mockResolvedValue({ ...user, google_id: "google id" });

    await SocialAuthService.login({ code: "google code", strategy: "google" });
    expect(GithubSpy).not.toHaveBeenCalled();
    expect(GoogleSpy).toHaveBeenCalled();
  });
});