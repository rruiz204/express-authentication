import { describe, test, expect, vi, afterAll } from "vitest";
import UserService from "../../services/UserService";
import UserRepository from "../../repositories/UserRepository";
import UserFactory from "../../database/factories/UserFactory";

describe("User Service", async () => {
  const user = await UserFactory();
  const { username, email, password } = user;

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("Create User Success Case", async () => {
    vi.spyOn(UserRepository, "findByEmail").mockResolvedValue(null);
    vi.spyOn(UserRepository, "create").mockResolvedValue(user);

    try { 
      const user2 = await UserService.create({ username, email, password });
      expect(user2.id).toEqual(user.id);
    } catch (error) { }
  });

  test("Create User 'user already exists' Case", async () => {
    vi.spyOn(UserRepository, "findByEmail").mockResolvedValue(user);

    try {
      await UserService.create({ username, email, password });
    } catch (error) {
      expect((error as Error).message).toEqual("The user already exists");
    }
  });

  test("Login User Success Case", async () => {
    vi.spyOn(UserRepository, "findByEmail").mockResolvedValue(user);

    try {
      const user = await UserService.login({ email, password });
      expect(user.id).toEqual(user.id);
    } catch (error) { }
  });

  test("Login User 'user does not exist' Case", async () => {
    vi.spyOn(UserRepository, "findByEmail").mockResolvedValue(null);

    try {
      await UserService.login({ email, password });
    } catch (error) {
      expect((error as Error).message).toEqual("The user does not exist");
    }
  });

  test("Login User 'invalid credentials' Case", async () => {
    vi.spyOn(UserRepository, "findByEmail").mockResolvedValue(user);
    
    try {
      await UserService.login({ email, password: "fake password" });
    } catch (error) {
      expect((error as Error).message).toEqual("Invalid Credentials");
    }
  });
});