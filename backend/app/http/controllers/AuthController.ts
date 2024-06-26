import RequestHandler from "./RequestHandler";
import UserService from "../../services/UserService";
import GithubService from "../../services/GithubService";
import GoogleService from "../../services/GoogleService";
import AuthUserDTO from "../../dto/auth/AuthUserDTO";

const register = RequestHandler(async (req) => {
  const user = await UserService.create(req.body);
  return await AuthUserDTO(user.id);
});

const login = RequestHandler(async (req) => {
  const user = await UserService.login(req.body);
  return await AuthUserDTO(user.id);
});

const github = RequestHandler(async (req) => {
  const user = await GithubService.login(req.body.code);
  return await AuthUserDTO(user.id);
});

const google = RequestHandler(async (req) => {
  const user = await GoogleService.login(req.body.code);
  return await AuthUserDTO(user.id);
});


const AuthController = { register, login, github, google };
export default AuthController;