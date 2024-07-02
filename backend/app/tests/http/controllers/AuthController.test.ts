import { describe, test, expect, vi, afterAll } from "vitest";
import UserFactory from "../../../database/factories/UserFactory";
import UserService from "../../../services/UserService";
import JwtAuthService from "../../../services/authentication/JwtAuthService";
import SocialAuthService from "../../../services/authentication/SocialAuthService";
import Tokens from "../../../utils/tokens";

import request from "supertest";
import app from "../../../server";

describe("auth controller", async () => {
  const user = { ...await UserFactory({}), github_id: null, google_id: null };
  const error = new Error("HTTP 500");

  const { username, email, password } = user;

  vi.spyOn(Tokens, "create").mockResolvedValue("mock token");

  afterAll(() => {
    vi.clearAllMocks();
  });

  test("register - POST - 200", async () => {
    vi.spyOn(UserService, "create").mockResolvedValue(user);
    const response = await request(app).post("/api/auth/register").send({ username, email, password });

    expect(response.body.data.jwt).toEqual("mock token");
    expect(response.status).toEqual(200);
  });

  test("regisyter - POST - 500", async () => {
    vi.spyOn(UserService, "create").mockImplementation(() => { throw error });
    const response = await request(app).post("/api/auth/register").send({ username, email, password });

    expect(response.body.error).toEqual(error.message);
    expect(response.status).toEqual(500);
  });

  test("login - POST - 200", async () => {
    vi.spyOn(JwtAuthService, "login").mockResolvedValue(user);
    const response = await request(app).post("/api/auth/login").send({ email, password });

    expect(response.body.data.jwt).toEqual("mock token");
    expect(response.status).toEqual(200);
  });

  test("login - POST - 500", async () => {
    vi.spyOn(JwtAuthService, "login").mockImplementation(() => {throw error});
    const response = await request(app).post("/api/auth/login").send({ email, password });

    expect(response.body.error).toEqual(error.message);
    expect(response.status).toEqual(500);
  });

  test("social - post - 200", async () => {
    vi.spyOn(SocialAuthService, "login").mockResolvedValue(user);
    const body = { code: "gitub code", strategy: "github" };
    const response = await request(app).post("/api/auth/social").send(body);

    expect(response.body.data.jwt).toEqual("mock token");
    expect(response.status).toEqual(200);
  });

  test("social - post - 500", async () => {
    vi.spyOn(SocialAuthService, "login").mockImplementation(() => {throw error});
    const body = { code: "google code", strategy: "google" };
    const response = await request(app).post("/api/auth/social").send(body);

    expect(response.body.error).toEqual(error.message);
    expect(response.status).toEqual(500);
  });
});