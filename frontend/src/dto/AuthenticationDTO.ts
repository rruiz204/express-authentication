export interface LoginBodyDTO {
  email: string;
  password: string;
}

export interface RegisterBodyDTO {
  username: string;
  email: string;
  password: string;
}

export interface AuthDataDTO {
  jwt: string;
  type: string;
}