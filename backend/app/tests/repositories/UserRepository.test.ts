import { describe, test, expect, afterEach } from "vitest";
import UserRepository from "../../repositories/UserRepository";
import UserFactory from "../../database/factories/UserFactory";
import RefreshDatabase from "../../database/refresh";
import EnumTables from "../../types/tables";
import { TestClient } from "../../database/clients";

describe("User Repository", async () => {
  const user = await UserFactory();
  const { username, email, password } = user;

  const tables: EnumTables[] = [
    EnumTables.User
  ];
  
  afterEach(async () => {
    await RefreshDatabase(tables);
  });

  test("Create User Method", async () => {
    await UserRepository.create({ username, email, password }, TestClient);
    const users = await TestClient.user.count();
    expect(users).toEqual(1);
  });

  test("Find User Method", async () => {
    await UserRepository.create({ username, email, password }, TestClient);
    const user2 = await UserRepository.findByEmail(email, TestClient);
    expect(user2?.email).toEqual(user.email);
  });
});