export interface SocialLoginDTO {
  code: string;
  strategy: "github" | "google";
}