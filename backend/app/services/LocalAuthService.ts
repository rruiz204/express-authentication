import LocalStrategy from "../authentication/LocalStrategy";
import { type LocalLoginDTO } from "../dto/AuthenticationDTO";

async function login(body: LocalLoginDTO) {
  return await LocalStrategy.login(body);
};

const LocalAuthService = { login };
export default LocalAuthService;