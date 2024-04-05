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

  test("Login User Successful Case", async () => {
    spyOn(AuthRepository, "findUser").mockResolvedValue(mockUser);
    try {
      const user = await AuthService.loginUser({ email, password });
      expect(user.id).toEqual(mockUser.id);
    } catch (error: any) { }
  })

  test("Login User 'user does not exist' Case", async () => {
    spyOn(AuthRepository, "findUser").mockResolvedValue(null);
    try {
      await AuthService.loginUser({ email, password });
    } catch (error: any) {
      expect(error.message).toEqual("The user does not exist");
    }
  })

  test("Login User 'invalid credentials' Case", async () => {
    spyOn(AuthRepository, "findUser").mockResolvedValue(mockUser);
    try {
      await AuthService.loginUser({ email, password: "fakePassword" });
    } catch (error: any) {
      expect(error.message).toEqual("Invalid credentials");
    }
  })
})