export interface IRegisterBody {
  username: string;
  email: string;
  password: string;
}

export interface ILoginBody {
  email: string;
  password: string;
}