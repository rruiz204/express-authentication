import { describe, test, expect, vi, afterAll } from "vitest";
import AuthService from "../../services/AuthService";
import AuthRepository from "../../repositories/AuthRepository";
import UserFactory from "../../factories/UserFactory";

describe("Auth Service", async () => {
  const mockUser = await UserFactory();
  const { username, email, password } = mockUser;

  afterAll(() => {
    vi.restoreAllMocks();
  })

  test("Create User Success Case", async () => {
    vi.spyOn(AuthRepository, "findUser").mockResolvedValue(null);
    vi.spyOn(AuthRepository, "createUser").mockResolvedValue(mockUser);

    try {
      const user = await AuthService.createUser({ username, email, password });
      expect(user.id).toEqual(mockUser.id);
    } catch (error: any) { }
  })

  test("Create User 'user already exists' Case", async () => {
    vi.spyOn(AuthRepository, "findUser").mockResolvedValue(mockUser);
    try {
      await AuthService.createUser({ username, email, password });
    } catch (error: any) {
      expect(error.message).toEqual("The user already exists");
    }
  })
})