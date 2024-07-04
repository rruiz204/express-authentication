import GoogleStrategy from "../authentication/GoogleStrategy";
import GithubStrategy from "../authentication/GithubStrategy";
import { type SocialLoginDTO } from "../dto/AuthenticationDTO";

const strategies = {
  google: GoogleStrategy,
  github: GithubStrategy,
};

async function login(body: SocialLoginDTO) {
  const strategy = strategies[body.strategy];
  return await strategy.login(body);
};

const SocialAuthService = { login };
export default SocialAuthService;