import { describe, test, expect, vi, afterAll } from "vitest";
import LocalStrategy from "../../authentication/LocalStrategy";
import LocalAuthService from "../../services/LocalAuthService";
import UserFactory from "../../database/factories/UserFactory";

describe("local auth service", async () => {
  const user = await UserFactory({ password: "123456789" });

  const email = user.email;
  const password = user.password!;

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test("local auth login", async () => {
    vi.spyOn(LocalStrategy, "login").mockResolvedValue(user);
    const user2 = await LocalAuthService.login({ email, password });
    expect(user2.id).toEqual(user.id);
  });
});