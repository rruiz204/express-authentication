import { describe, test, expect, vi, afterAll } from "vitest";
import GoogleStrategy from "../../../services/authentication/GoogleStrategy";
import UserRepository from "../../../repositories/UserRepository";
import UserFactory from "../../../database/factories/UserFactory";

describe("google strategy", async () => {
  const user = { ...await UserFactory({}), github_id: null, google_id: null };
  const { username, email, google_id } = user;

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("login user with google successful case", async () => {
    vi.spyOn(GoogleStrategy, "request").mockResolvedValue({ username, email, id: google_id });
    vi.spyOn(UserRepository, "find").mockResolvedValue({ ...user, google_id: "google id" });

    try {
      const user2 = await GoogleStrategy.login("google code");
      expect(user2.id).toEqual(user.id);
    } catch (error) { }
  });

  test("create user with google successful case", async () => {
    vi.spyOn(GoogleStrategy, "request").mockResolvedValue({ username, email, id: google_id });
    vi.spyOn(UserRepository, "find").mockResolvedValue(null);
    vi.spyOn(UserRepository, "create").mockResolvedValue({ ...user, google_id: "google id" });

    try {
      const user2 = await GoogleStrategy.login("google code");
      expect(user2.id).toEqual(user.id);
    } catch (error) { }
  });

  test("user registered with another platform", async () => {
    vi.spyOn(GoogleStrategy, "request").mockResolvedValue({ username, email, id: google_id });
    vi.spyOn(UserRepository, "find").mockResolvedValue({ ...user, github_id: "github id" });

    try {
      await GoogleStrategy.login("google code");
    } catch (error) {
      expect((error as Error).message).toEqual("You are registered with another platform, try Github.");
    }
  });
});