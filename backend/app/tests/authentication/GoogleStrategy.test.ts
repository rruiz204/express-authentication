import { describe, test, expect, vi, afterAll } from "vitest";
import GoogleStrategy from "../../authentication/GoogleStrategy";
import UserRepository from "../../repositories/UserRepository";
import UserFactory from "../../database/factories/UserFactory";
import { type SocialLoginDTO } from "../../dto/AuthenticationDTO";

describe("google strategy", async () => {
  const user = await UserFactory({ google_id: "google id" });
  const { username, email, google_id } = user;

  const body: SocialLoginDTO = { code: "google code", strategy: "google" };
  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("create user with google successful case", async () => {
    vi.spyOn(GoogleStrategy, "request").mockResolvedValue({ username, email, id: google_id });
    vi.spyOn(UserRepository, "find").mockResolvedValue(null);
    vi.spyOn(UserRepository, "create").mockResolvedValue(user);

    try {
      const user2 = await GoogleStrategy.login(body);
      expect(user2.id).toEqual(user.id);
    } catch (error) { }
  });

  test("create user with google successful case", async () => {
    vi.spyOn(GoogleStrategy, "request").mockResolvedValue({ username, email, id: google_id });
    vi.spyOn(UserRepository, "find").mockResolvedValue(null);
    vi.spyOn(UserRepository, "create").mockResolvedValue(user);

    try {
      const user2 = await GoogleStrategy.login(body);
      expect(user2.id).toEqual(user.id);
    } catch (error) { }
  });

  test("user registered with another platform", async () => {
    vi.spyOn(GoogleStrategy, "request").mockResolvedValue({ username, email, id: google_id });
    vi.spyOn(UserRepository, "find").mockResolvedValue({ ...user, github_id: "github id", google_id: null });

    try {
      await GoogleStrategy.login(body);
    } catch (error) {
      expect((error as Error).message).toEqual("You are registered with another platform, try Github.");
    }
  });
});