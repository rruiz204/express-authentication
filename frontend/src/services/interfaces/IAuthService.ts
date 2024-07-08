import { AuthResponseDTO, RegisterBodyDTO } from "../../dto/AuthenticationDTO";

interface RegisterInterface {
  register(body: RegisterBodyDTO): Promise<AuthResponseDTO>;
};

interface LoginInterface<Body> {
  login(body: Body): Promise<AuthResponseDTO>;
};

export interface ILocalAuthService<Body>
  extends LoginInterface<Body>, RegisterInterface { };

export interface ISocialAuthService<Body> extends LoginInterface<Body> {
  redirect(): void;
};