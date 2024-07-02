import GithubStrategy from "./GithubStrategy";
import GoogleStrategy from "./GoogleStrategy";
import { type SocialLoginDTO } from "../../dto/auth/SocialLoginDTO";

const strategies = {
  google: GoogleStrategy,
  github: GithubStrategy,
};

async function login(body: SocialLoginDTO) {
  const strategy = strategies[body.strategy];
  return await strategy.login(body.code);
};

const SocialAuthService = { login };
export default SocialAuthService;