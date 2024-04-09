import { describe, test, expect, vi, afterAll } from "vitest";
import UserFactory from "../../factories/UserFactory";
import AuthService from "../../services/AuthService";
import Tokens from "../../utils/tokens";
import request from "supertest";
import { app } from "../../..";


describe("Auth Controller", async () => {
  const mockUser = await UserFactory();
  const mockError = new Error("HTTP 500")
  const { username, email, password } = mockUser;

  vi.spyOn(Tokens, "create").mockResolvedValue("mock token");

  afterAll(() => {
    vi.clearAllMocks();
  })

  test("Register - POST - 200", async () => {
    vi.spyOn(AuthService, "createUser").mockResolvedValue(mockUser);    
    const response = await request(app).post("/api/auth/register").send({ username, email, password });

    expect(response.body.jwt).toEqual("mock token");
    expect(response.status).toEqual(200);
  })

  test("Register - POST - 500", async () => {
    vi.spyOn(AuthService, "createUser").mockImplementation(() => {throw mockError});
    const response = await request(app).post("/api/auth/register").send({ username, email, password });

    expect(response.body.error).toEqual(mockError.message);
    expect(response.status).toEqual(500);
  })
})