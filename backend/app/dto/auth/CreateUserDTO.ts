export interface CreateUserDTO {
  username: string;
  email: string;
  password?: string;
  github_id?: string;
  google_id?: string;
}