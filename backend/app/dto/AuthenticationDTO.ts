import Tokens from "../utils/tokens";

export interface LocalLoginDTO {
  email: string;
  password: string;
};

export interface SocialLoginDTO {
  code: string;
  strategy: "github" | "google";
};

export async function AuthResponseDTO(id: number) {
  const token = await Tokens.create({ id: id });
  return { data: { jwt: token, type: "Bearer" } };
};