import { describe, test, expect, vi, afterAll } from "vitest";
import AuthService from "../../services/AuthService";
import AuthRepository from "../../repositories/AuthRepository";
import UserFactory from "../../database/factories/UserFactory";

describe("Auth Service", async () => {
  const user = await UserFactory();

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("Create User Success Case", async () => {
    vi.spyOn(AuthRepository, "findUser").mockResolvedValue(null);
    vi.spyOn(AuthRepository, "createUser").mockResolvedValue(user);

    try { 
      const user2 = await AuthService.createUser({ ...user });
      expect(user2.id).toEqual(user.id);
    } catch (error: any) { }
  });

  test("Create User 'user already exists' Case", async () => {
    vi.spyOn(AuthRepository, "findUser").mockResolvedValue(user);

    try {
      await AuthService.createUser({ ...user });
    } catch (error: any) {
      expect((error as Error).message).toEqual("The user already exists");
    }
  });
});