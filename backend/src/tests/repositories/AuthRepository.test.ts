import { describe, test, expect, afterEach } from "bun:test";
import { AuthRepository } from "../../repositories/AuthRepository";
import UserFactory from "../../factories/UserFactory";
import { PrismaTest } from "../../repositories/database";

describe("Auth Repository", async () => {
  const mockUser = await UserFactory();
  const { username, email, password } = mockUser;

  afterEach(async () => {
    await PrismaTest.user.deleteMany({});
  })

  test("Create User Method", async () => {
    await AuthRepository.createUser({ username, email, password }, PrismaTest);
    const users = await PrismaTest.user.count();
    expect(users).toEqual(1);
  })

  test("Find User Method", async () => {
    await AuthRepository.createUser({ username, email, password }, PrismaTest);
    const user = await AuthRepository.findUser(email, PrismaTest);
    expect(user.email).toEqual(mockUser.email);
  })
})