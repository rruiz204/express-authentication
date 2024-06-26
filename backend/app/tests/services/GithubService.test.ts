import { describe, test, expect, vi, afterAll } from "vitest";
import GithubService from "../../services/GithubService";
import UserRepository from "../../repositories/UserRepository";
import UserFactory from "../../database/factories/UserFactory";

describe("github service", async () => {
  const user = { ...await UserFactory({}), github_id: null, google_id: null };
  const { username, email, github_id } = user;

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("login user with github successful case", async () => {
    vi.spyOn(GithubService, "request").mockResolvedValue({ username, email, id: github_id });
    vi.spyOn(UserRepository, "find").mockResolvedValue({ ...user, github_id: "github id" });

    try {
      const user2 = await GithubService.login("github code");
      expect(user2.id).toEqual(user.id);
    } catch (error) { }
  });

  test("create user with github successful case", async () => {
    vi.spyOn(GithubService, "request").mockResolvedValue({ username, email, id: github_id });
    vi.spyOn(UserRepository, "find").mockResolvedValue(null);
    vi.spyOn(UserRepository, "create").mockResolvedValue({ ...user, github_id: "github id" });

    try {
      const user2 = await GithubService.login("github code");
      expect(user2.id).toEqual(user.id);
    } catch (error) { }
  });

  test("user registered with another platform", async () => {
    vi.spyOn(GithubService, "request").mockResolvedValue({ username, email, id: github_id });
    vi.spyOn(UserRepository, "find").mockResolvedValue({ ...user, google_id: "google id" });

    try {
      await GithubService.login("github code");
    } catch (error) {
      expect((error as Error).message).toEqual("You are registered with another platform, try Google");
    }
  });
});