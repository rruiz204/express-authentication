export interface ModelUserDTO {
  id: number;
  username: string;
  email: string;
  password: string | null;
  google_id: string | null;
  github_id: string | null;
  created_at: Date;
  updated_at: Date;
};

export interface CreateUserDTO {
  username: string;
  email: string;
  password?: string;
  github_id?: string;
  google_id?: string;
};

export interface FindUserDTO {
  id?: number;
  username?: string;
  email?: string;
};