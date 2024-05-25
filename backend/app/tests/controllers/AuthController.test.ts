import { describe, test, expect, vi, afterAll } from "vitest";
import UserFactory from "../../database/factories/UserFactory";
import AuthService from "../../services/AuthService";
import Tokens from "../../utils/tokens";
import request from "supertest";
import app from "../../server";

describe("Auth Controller", async () => {
  const user = await UserFactory();
  const error = new Error("HTTP 500");

  vi.spyOn(Tokens, "create").mockResolvedValue("mock token");

  afterAll(() => {
    vi.clearAllMocks();
  });

  test("Register - POST - 200", async () => {
    vi.spyOn(AuthService, "createUser").mockResolvedValue(user);
    const response = await request(app).post("/api/auth/register").send({ ...user });

    expect(response.body.data.jwt).toEqual("mock token");
    expect(response.status).toEqual(200);
  });

  test("Register - POST - 500", async () => {
    vi.spyOn(AuthService, "createUser").mockImplementation(() => {throw error});
    const response = await request(app).post("/api/auth/register").send({ ...user });

    expect(response.body.error).toEqual(error.message);
    expect(response.status).toEqual(500);
  });
});