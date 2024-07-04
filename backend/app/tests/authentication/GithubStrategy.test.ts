import { describe, test, expect, vi, afterAll } from "vitest";
import GithubStrategy from "../../authentication/GithubStrategy";
import UserRepository from "../../repositories/UserRepository";
import UserFactory from "../../database/factories/UserFactory";
import { type SocialLoginDTO } from "../../dto/AuthenticationDTO";

describe("github strategy", async () => {
  const user = await UserFactory({ github_id: "github id" });
  const { username, email, github_id } = user;

  const body: SocialLoginDTO = { code: "github code", strategy: "github" };
  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("login user with github successful case", async () => {
    vi.spyOn(GithubStrategy, "request").mockResolvedValue({ username, email, id: github_id });
    vi.spyOn(UserRepository, "find").mockResolvedValue(user);

    try {
      const user2 = await GithubStrategy.login(body);
      expect(user2.id).toEqual(user.id);
    } catch (error) { }
  });

  test("create user with github successful case", async () => {
    vi.spyOn(GithubStrategy, "request").mockResolvedValue({ username, email, id: github_id });
    vi.spyOn(UserRepository, "find").mockResolvedValue(null);
    vi.spyOn(UserRepository, "create").mockResolvedValue(user);

    try {
      const user2 = await GithubStrategy.login(body);
      expect(user2.id).toEqual(user.id);
    } catch (error) { }
  });

  test("user registered with another platform", async () => {
    vi.spyOn(GithubStrategy, "request").mockResolvedValue({ username, email, id: github_id });
    vi.spyOn(UserRepository, "find").mockResolvedValue({ ...user, google_id: "google id", github_id: null });

    try {
      await GithubStrategy.login(body);
    } catch (error) {
      expect((error as Error).message).toEqual("You are registered with another platform, try Google");
    }
  });
});