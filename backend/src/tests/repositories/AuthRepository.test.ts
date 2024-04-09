import { describe, test, expect, afterEach } from "vitest";
import AuthRepository from "../../repositories/AuthRepository";
import UserFactory from "../../factories/UserFactory";
import RefreshDatabase from "../../utils/refresh";
import EnumTables from "../../types/enums";
import { TestClient } from "../../repositories/database";

describe("Auth Repository", async () => {
  const mockUser = await UserFactory();
  const { username, email, password } = mockUser;

  afterEach(async () => {
    RefreshDatabase([EnumTables.User]);
  })

  test("Create User Method", async () => {
    await AuthRepository.createUser({ username, email, password }, TestClient);
    const users = await TestClient.user.count();
    expect(users).toEqual(1);
  })

  test("Find User Method", async () => {
    await AuthRepository.createUser({ username, email, password }, TestClient);
    const user = await AuthRepository.findUser(email, TestClient);
    expect(user?.email).toEqual(mockUser.email);
  })
})