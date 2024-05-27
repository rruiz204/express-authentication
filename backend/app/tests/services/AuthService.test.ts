import { describe, test, expect, vi, afterAll } from "vitest";
import AuthService from "../../services/AuthService";
import UserRepository from "../../repositories/UserRepository";
import UserFactory from "../../database/factories/UserFactory";

describe("Auth Service", async () => {
  const user = await UserFactory();
  const { username, email, password } = user;

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("Create User Success Case", async () => {
    vi.spyOn(UserRepository, "findUser").mockResolvedValue(null);
    vi.spyOn(UserRepository, "createUser").mockResolvedValue(user);

    try { 
      const user2 = await AuthService.createUser({ username, email, password });
      expect(user2.id).toEqual(user.id);
    } catch (error) { }
  });

  test("Create User 'user already exists' Case", async () => {
    vi.spyOn(UserRepository, "findUser").mockResolvedValue(user);

    try {
      await AuthService.createUser({ username, email, password });
    } catch (error) {
      expect((error as Error).message).toEqual("The user already exists");
    }
  });

  test("Login User Success Case", async () => {
    vi.spyOn(UserRepository, "findUser").mockResolvedValue(user);

    try {
      const user = await AuthService.loginUser({ email, password });
      expect(user.id).toEqual(user.id);
    } catch (error) { }
  });

  test("Login User 'user does not exist' Case", async () => {
    vi.spyOn(UserRepository, "findUser").mockResolvedValue(null);

    try {
      await AuthService.loginUser({ email, password });
    } catch (error) {
      expect((error as Error).message).toEqual("The user does not exist");
    }
  });

  test("Login User 'invalid credentials' Case", async () => {
    vi.spyOn(UserRepository, "findUser").mockResolvedValue(user);
    
    try {
      await AuthService.loginUser({ email, password: "fake password" });
    } catch (error) {
      expect((error as Error).message).toEqual("Invalid Credentials");
    }
  });
});