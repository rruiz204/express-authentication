import { describe, test, expect, vi, afterAll } from "vitest";
import UserService from "../../services/UserService";
import UserRepository from "../../repositories/UserRepository";
import UserFactory from "../../database/factories/UserFactory";

describe("user service", async () => {
  const user = { ...await UserFactory({}), github_id: null, google_id: null };
  const { username, email, password } = user;

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("create user seccessful case", async () => {
    vi.spyOn(UserRepository, "find").mockResolvedValue(null);
    vi.spyOn(UserRepository, "create").mockResolvedValue(user);

    try {
      const user2 = await UserService.create({ username, email, password });
      expect(user2.id).toEqual(user.id);
    } catch (error) { }
  });

  test("user already exists", async () => {
    vi.spyOn(UserRepository, "find").mockResolvedValue(user);
    try {
      await UserService.create({ username, email, password });
    } catch (error) {
      expect((error as Error).message).toEqual("The user already exists");
    }
  });

  test("login user successful case", async () => {
    vi.spyOn(UserRepository, "find").mockResolvedValue(user);
    try {
      const user2 = await UserService.login({ email, password });
      expect(user2.id).toEqual(user.id);
    } catch (error) { }
  });

  test("user does not exists", async () => {
    vi.spyOn(UserRepository, "find").mockResolvedValue(null);
    try {
      await UserService.login({ email, password });
    } catch (error) {
      expect((error as Error).message).toEqual("The user does not exist");
    }
  });

  test("invalid credentials", async () => {
    vi.spyOn(UserRepository, "find").mockResolvedValue(user);
    try {
      await UserService.login({ email, password: "fake password" });
    } catch (error) {
      expect((error as Error).message).toEqual("Invalid Credentials");
    }
  });
});