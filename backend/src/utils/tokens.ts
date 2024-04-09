import { SignJWT, jwtVerify } from "jose";

const encoder = new TextEncoder();
const secret = encoder.encode(process.env.JWT_SECRET);

const create = async (payload: any) => {
  const constructor = new SignJWT(payload);
  const token = await constructor
    .setProtectedHeader({alg: "HS256", typ: "JWT"})
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);
  return token;
}

const verify = async (token: string) => {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (errot: any) {
    return null;
  }
}

const Tokens = { create, verify };
export default Tokens;