export interface IRegisterResponse {
  message?: string;
  jwt?: string;
  error?: string;
}

export interface ILoginResponse {
  message: string;
  jwt?: string;
  type?: string;
  error?: string;
}