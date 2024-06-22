export interface LoginBodyDTO {
  email: string;
  password: string;
}

export interface RegisterBodyDTO {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  data?: { jwt: string, type: string };
  error?: string;
}