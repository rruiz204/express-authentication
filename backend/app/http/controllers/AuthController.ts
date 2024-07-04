import RequestHandler from "./RequestHandler";
import UserService from "../../services/UserService";
import LocalAuthService from "../../services/LocalAuthService";
import SocialAuthService from "../../services/SocialAuthService";
import { AuthResponseDTO } from "../../dto/AuthenticationDTO";

const register = RequestHandler(async (req) => {
  const user = await UserService.create(req.body);
  return await AuthResponseDTO(user.id);
});

const login = RequestHandler(async (req) => {
  const user = await LocalAuthService.login(req.body);
  return await AuthResponseDTO(user.id);
});

const social = RequestHandler(async (req) => {
  const user = await SocialAuthService.login(req.body);
  return await AuthResponseDTO(user.id);
});

const AuthController = { register, login, social };
export default AuthController;