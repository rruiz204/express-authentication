import { describe, test, expect, vi, afterAll } from "vitest";
import LocalStrategy from "../../authentication/LocalStrategy";
import UserRepository from "../../repositories/UserRepository";
import UserFactory from "../../database/factories/UserFactory";

describe("local strategy", async () => {
  const user = await UserFactory({ password: "123456789" });
  
  const email = user.email;
  const password = user.password!;

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("login user successful case", async () => {
    vi.spyOn(UserRepository, "find").mockResolvedValue(user);
    try {
      const user2 = await LocalStrategy.login({ email, password });
      expect(user2.id).toEqual(user.id);
    } catch (error) { }
  });

  test("user does not exists", async () => {
    vi.spyOn(UserRepository, "find").mockResolvedValue(null);
    try {
      await LocalStrategy.login({ email, password });
    } catch (error) {
      expect((error as Error).message).toEqual("The user does not exist");
    }
  });

  test("invalid credentials", async () => {
    vi.spyOn(UserRepository, "find").mockResolvedValue(user);
    try {
      await LocalStrategy.login({ email, password: "fake password" });
    } catch (error) {
      expect((error as Error).message).toEqual("Invalid Credentials");
    }
  });
});