import { describe, test, expect, vi, afterAll } from "vitest";
import UserFactory from "../../../database/factories/UserFactory";
import UserService from "../../../services/UserService";
import GithubService from "../../../services/GithubService";
import GoogleService from "../../../services/GoogleService";
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
    vi.spyOn(UserService, "login").mockResolvedValue(user);
    const response = await request(app).post("/api/auth/login").send({ email, password });

    expect(response.body.data.jwt).toEqual("mock token");
    expect(response.status).toEqual(200);
  });

  test("login - POST - 500", async () => {
    vi.spyOn(UserService, "login").mockImplementation(() => {throw error});
    const response = await request(app).post("/api/auth/login").send({ email, password });

    expect(response.body.error).toEqual(error.message);
    expect(response.status).toEqual(500);
  });

  test("google - POST - 200", async () => {
    vi.spyOn(GoogleService, "login").mockResolvedValue(user);
    const response = await request(app).post("/api/auth/google").send({ code: "google code" });

    expect(response.body.data.jwt).toEqual("mock token");
    expect(response.status).toEqual(200);
  });

  test("google - POST - 500", async () => {
    vi.spyOn(GoogleService, "login").mockImplementation(() => {throw error});
    const response = await request(app).post("/api/auth/google").send({ code: "google code" });

    expect(response.body.error).toEqual(error.message);
    expect(response.status).toEqual(500);
  });

  test("github - POST - 200", async () => {
    vi.spyOn(GithubService, "login").mockResolvedValue(user);
    const response = await request(app).post("/api/auth/github").send({ code: "github code" });

    expect(response.body.data.jwt).toEqual("mock token");
    expect(response.status).toEqual(200);
  });

  test("github - POST - 500", async () => {
    vi.spyOn(GithubService, "login").mockImplementation(() => {throw error});
    const response = await request(app).post("/api/auth/github").send({ code: "github code" });

    expect(response.body.error).toEqual(error.message);
    expect(response.status).toEqual(500);
  });
});