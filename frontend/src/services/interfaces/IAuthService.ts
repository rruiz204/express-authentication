import { IUseFetch } from "../../hooks/useFetch";
import type { AuthDataDTO, RegisterBodyDTO } from "../../dto/AuthenticationDTO";

interface RegisterInterface {
  register(): IUseFetch<AuthDataDTO, RegisterBodyDTO>;
};

interface LoginInterface<Body> {
  login(): IUseFetch<AuthDataDTO, Body>;
};

export interface ILocalAuthService<Body>
  extends LoginInterface<Body>, RegisterInterface { };

export interface ISocialAuthService<Body> extends LoginInterface<Body> {
  redirect(): void;
};