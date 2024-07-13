import UserRepository from "../repositories/UserRepository";
import { MainClient } from "../database/clients";
import social from "../config/social";
import { type SocialLoginDTO } from "../dto/AuthenticationDTO";
import { type ISocialStrategy } from "./IStrategy";

async function request(code: string) {
  const client_id = `client_id=${social.github.client_id}`;
  const client_secret = `client_secret=${social.github.client_secret}`;
  const params = `${client_id}&${client_secret}&code=${code}`;

  const { access_token } = await fetch(`https://github.com/login/oauth/access_token?${params}`, {
    headers: { "Accept": "application/json" }
  }).then(async (res) => await res.json());

  const response = await fetch("https://api.github.com/user", {
    headers: { "Authorization": `Bearer ${access_token}` }
  });
  return await response.json();
};

async function login(body: SocialLoginDTO) {
  const { name: username, email, id } = await request(body.code);

  let user = await UserRepository.find({ username, email }, MainClient);
  if (user?.google_id) throw Error("You are registered with another platform, try Google");

  if (!user) {
    return user = await UserRepository.create({
      username: username,
      email: email,
      github_id: (id as number).toString(),
    }, MainClient);
  }
  return user;
};

const GithubStrategy: ISocialStrategy = { login, request };
export default GithubStrategy;