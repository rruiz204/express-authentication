import { describe, test, expect } from "vitest";
import { SignJWT, jwtVerify } from "jose";
import Tokens from "../../utils/tokens";

describe("tokens utils", () => {
  const encoder = new TextEncoder();
  const secret = encoder.encode(process.env.JWT_SECRET);

  test("create token", async () => {
    const token = await Tokens.create({ id: 100 });
    const { payload } = await jwtVerify(token, secret);
    expect(payload.id).toEqual(100);
  });

  test("verify token successful case", async () => {
    const constructor = new SignJWT({ id: 101 });
    const token = await constructor
      .setProtectedHeader({alg: "HS256", typ: "JWT"})
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(secret);
    const payload = await Tokens.verify(token);
    expect(payload?.id).toEqual(101);
  });

  test("invalid token", async () => {
    const payload = await Tokens.verify("fake token");
    expect(payload).toBeNull();
  });
});