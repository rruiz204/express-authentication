import type { LocalLoginDTO, SocialLoginDTO } from "../dto/AuthenticationDTO";
import { type ModelUserDTO } from "../dto/UserDTO";

export interface ILocalStrategy {
  login(body: LocalLoginDTO): Promise<ModelUserDTO>;
};

export interface ISocialStrategy {
  login(body: SocialLoginDTO): Promise<ModelUserDTO>;
  request(code: string): Promise<any>;
};