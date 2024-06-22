import { AuthResponseDTO } from "../../dto/AuthenticationDTO";

export interface SocialService {
  login(code: string): Promise<AuthResponseDTO>;
  redirect(): void;
}