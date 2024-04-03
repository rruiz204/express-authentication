import { describe, test, expect, spyOn, jest, afterAll } from "bun:test";
import { AuthService } from "../../services/AuthService";
import UserFactory from "../../factories/UserFactory";
import { Tokens } from "../../utils/tokens";
import request from "supertest";
import { app } from "../../..";

describe("Auth Controller", async () => {
  const mockUser = await UserFactory();
  const mockError = new Error("500 Error");
  const { username, email, password } = mockUser;

  spyOn(Tokens, "create").mockResolvedValue("mock token");

  afterAll(() => {
    jest.restoreAllMocks();
  })

  test("Register - POST - 200", async () => {
    spyOn(AuthService, "createUser").mockResolvedValue(mockUser);
    const response = await request(app).post("/api/auth/register").send({ username, email, password });

    expect(response.body.jwt).toEqual("mock token");
    expect(response.status).toEqual(200);
  })

  test("Register - POST - 500", async () => {
    spyOn(AuthService, "createUser").mockImplementation(() => { throw mockError });
    const response = await request(app).post("/api/auth/register").send({ username, email, password });

    expect(response.body.error).toEqual(mockError.message);
    expect(response.status).toEqual(500);
  })

  test("Login - POST - 200", async () => {
    spyOn(AuthService, "loginUser").mockResolvedValue(mockUser);
    const response = await request(app).post("/api/auth/login").send({ email, password });

    expect(response.body.jwt).toEqual("mock token");
    expect(response.status).toEqual(200);
  })

  test("Login - POST - 500", async () => {
    spyOn(AuthService, "loginUser").mockImplementation(() => { throw mockError });
    const response = await request(app).post("/api/auth/login").send({ email, password });

    expect(response.body.error).toEqual(mockError.message);
    expect(response.status).toEqual(500);
  })
})