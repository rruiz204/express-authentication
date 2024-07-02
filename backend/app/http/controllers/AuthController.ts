import RequestHandler from "./RequestHandler";
import UserService from "../../services/UserService";
import JwtAuthService from "../../services/authentication/JwtAuthService";
import SocialAuthService from "../../services/authentication/SocialAuthService";
import AuthUserDTO from "../../dto/auth/AuthUserDTO";

const register = RequestHandler(async (req) => {
  const user = await UserService.create(req.body);
  return await AuthUserDTO(user.id);
});

const login = RequestHandler(async (req) => {
  const user = await JwtAuthService.login(req.body);
  return await AuthUserDTO(user.id);
});

const social = RequestHandler(async (req) => {
  const user = await SocialAuthService.login(req.body);
  return await AuthUserDTO(user.id);
});

const AuthController = { register, login, social };
export default AuthController;