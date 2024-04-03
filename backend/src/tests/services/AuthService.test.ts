import { describe, test, expect, spyOn, jest, afterAll } from "bun:test";
import { AuthService } from "../../services/AuthService";
import { AuthRepository } from "../../repositories/AuthRepository";
import UserFactory from "../../factories/UserFactory";

describe("Auth Service", async () => {
  const mockUser = await UserFactory();
  const { username, email, password } = mockUser;

  afterAll(() => {
    jest.restoreAllMocks();
  })

  test("Create User Successful Case", async () => {
    spyOn(AuthRepository, "findUser").mockResolvedValue(null);
    spyOn(AuthRepository, "createUser").mockResolvedValue(mockUser);

    try {
      const user = await AuthService.createUser({ username, email, password });
      expect(user.id).toEqual(mockUser.id);
    } catch (error: any) { }
  })

  test("Create User 'user already exists' Case", async () => {
    spyOn(AuthRepository, "findUser").mockResolvedValue(mockUser);
    try {
      await AuthService.createUser({ username, email, password });
    } catch (error: any) {
      expect(error.message).toEqual("The user already exists");
    }
  })
})