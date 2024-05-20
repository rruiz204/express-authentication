interface IData {
  type: string;
  token: string;
}

export interface IAuthResponse {
  data?: IData | undefined;
  error?: string | undefined;
}