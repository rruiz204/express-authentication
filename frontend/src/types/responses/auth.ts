interface IAuthData {
  jwt: string;
  type: string;
}

export interface IAuthResponse {
  data?: IAuthData | undefined;
  error?: string | undefined;
}