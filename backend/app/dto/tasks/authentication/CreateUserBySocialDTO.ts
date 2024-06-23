export interface CreateUserBySocialDTO {
  username: string;
  email: string;
  github_id?: string;
  google_id?: string;
}