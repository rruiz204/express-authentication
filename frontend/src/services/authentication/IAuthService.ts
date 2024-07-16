import { HttpResponse } from "../../utils/Fetcher";
import type { AuthDataDTO, RegisterBodyDTO } from "../../dto/AuthenticationDTO";

interface RegisterInterface {
  register(body: RegisterBodyDTO): Promise<HttpResponse<AuthDataDTO>>;
};

interface LoginInterface<Body> {
  login(body: Body): Promise<HttpResponse<AuthDataDTO>>;
};

export interface ILocalAuthService<Body>
  extends LoginInterface<Body>, RegisterInterface { };

export interface ISocialAuthService<Body> extends LoginInterface<Body> {
  redirect(): void;
};