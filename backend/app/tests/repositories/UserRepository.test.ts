import { describe, test, expect, afterEach } from "vitest";
import UserRepository from "../../repositories/UserRepository";
import UserFactory from "../../database/factories/UserFactory";
import RefreshDatabase from "../../database/refresh";
import { TestClient } from "../../database/clients";

describe("user repository", async () => {
  const user = await UserFactory({
    password: "123456789",
    google_id: "google-code",
    github_id: "github-code",
  });

  const { username, email } = user;
  const password = user.password!;
  const google_id = user.google_id!;
  const github_id = user.github_id!;
  
  afterEach(async () => {
    await RefreshDatabase([UserRepository.table]);
  });

  test("create user with password", async () => {
    await UserRepository.create({ username, email, password }, TestClient);
    const user = await TestClient.user.findFirst({ where: { email } });
    expect(user?.password).not.toBeNull();
  });

  test("create user with google id", async () => {
    await UserRepository.create({ username, email, google_id }, TestClient);
    const user = await TestClient.user.findFirst({ where: { email } });
    expect(user?.google_id).not.toBeNull();
  });

  test("create user with github id", async () => {
    await UserRepository.create({ username, email, github_id }, TestClient);
    const user = await TestClient.user.findFirst({ where: { email } });
    expect(user?.github_id).not.toBeNull();
  });

  test("find user by id", async () => {
    const user = await UserRepository.create({ username, email, password }, TestClient);
    const user2 = await UserRepository.find({ id: user.id }, TestClient);
    expect(user2?.id).toEqual(user.id);
  });

  test("find user by username", async () => {
    await UserRepository.create({ username, email, password }, TestClient);
    const user = await UserRepository.find({ username }, TestClient);
    expect(user?.username).toEqual(username);
  });

  test("find user by email", async () => {
    await UserRepository.create({ username, email, password }, TestClient);
    const user = await UserRepository.find({ email }, TestClient);
    expect(user?.email).toEqual(email);
  });
});