import { describe, test, expect, vi, afterAll } from "vitest";
import GoogleStrategy from "../../authentication/GoogleStrategy";
import GithubStrategy from "../../authentication/GithubStrategy";
import SocialAuthService from "../../services/SocialAuthService";
import UserFactory from "../../database/factories/UserFactory";

describe("social auth service", async () => {
  const user = await UserFactory({});
  const { username, email } = user;

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("use github strategy", async () => {
    vi.spyOn(GithubStrategy, "request").mockResolvedValue({ username, email, id: "github id" });
    const GithubSpy = vi.spyOn(GithubStrategy, "login").mockResolvedValue({ ...user, github_id: "github id" });

    await SocialAuthService.login({ code: "github-code", strategy: "github" });
    expect(GithubSpy).toHaveBeenCalled();
  });

  test("use google strategy", async () => {
    vi.spyOn(GoogleStrategy, "request").mockResolvedValue({ username, email, id: "google id" });
    const GoogleSpy = vi.spyOn(GoogleStrategy, "login").mockResolvedValue({ ...user, google_id: "google id" });

    await SocialAuthService.login({ code: "google-code", strategy: "google" });
    expect(GoogleSpy).toHaveBeenCalled();
  });
});