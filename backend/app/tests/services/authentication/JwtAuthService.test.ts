import { describe, test, expect, vi, afterAll } from "vitest";
import JwtAuthService from "../../../services/authentication/JwtAuthService";
import UserRepository from "../../../repositories/UserRepository";
import UserFactory from "../../../database/factories/UserFactory";

describe("jwt auth service", async () => {
  const user = { ...await UserFactory({}), github_id: null, google_id: null };
  const { email, password } = user;

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("login user successful case", async () => {
    vi.spyOn(UserRepository, "find").mockResolvedValue(user);
    try {
      const user2 = await JwtAuthService.login({ email, password });
      expect(user2.id).toEqual(user.id);
    } catch (error) { }
  });

  test("user does not exists", async () => {
    vi.spyOn(UserRepository, "find").mockResolvedValue(null);
    try {
      await JwtAuthService.login({ email, password });
    } catch (error) {
      expect((error as Error).message).toEqual("The user does not exist");
    }
  });

  test("invalid credentials", async () => {
    vi.spyOn(UserRepository, "find").mockResolvedValue(user);
    try {
      await JwtAuthService.login({ email, password: "fake password" });
    } catch (error) {
      expect((error as Error).message).toEqual("Invalid Credentials");
    }
  });
});