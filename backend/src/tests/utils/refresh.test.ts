import { describe, test, expect, afterEach } from "vitest";
import AuthRepository from "../../repositories/AuthRepository";
import UserFactory from "../../factories/UserFactory";
import RefreshDatabase from "../../utils/refresh";
import EnumTables from "../../types/enums";
import { TestClient } from "../../repositories/database";

describe("Refresh Database Utils", () => {
  test("Successful Case", async () => {
    const mockUser = await UserFactory();
    const { username, email, password } = mockUser;

    await AuthRepository.createUser({ username, email, password }, TestClient);
    RefreshDatabase([EnumTables.User]);

    const users = await TestClient.user.count();
    expect(users).toEqual(0);
  })
})