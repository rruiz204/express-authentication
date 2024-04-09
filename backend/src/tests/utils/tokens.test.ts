import { describe, test, expect } from "vitest";
import { SignJWT, jwtVerify } from "jose";
import Tokens from "../../utils/tokens";

describe("Tokens Utils", () => {
  const encoder = new TextEncoder();
  const secret = encoder.encode(process.env.JWT_SECRET);
  
  test("Create Token", async () => {
    const token = await Tokens.create({ id: 100 });
    const { payload } = await jwtVerify(token, secret);
    expect(payload.id).toEqual(100);
  })

  test("Verify Token", async () => {
    const constructor = new SignJWT({ id: 200 });
    const token = await constructor
      .setProtectedHeader({alg: "HS256", typ: "JWT"})
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);
    const payload = await Tokens.verify(token);
    expect(payload?.id).toEqual(200);
  })
})