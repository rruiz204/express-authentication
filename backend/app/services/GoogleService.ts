import social from "../config/social";
import UserRepository from "../repositories/UserRepository";
import { MainClient } from "../database/clients";

async function request(code: string) {
  const { access_token } = await fetch(`https://oauth2.googleapis.com/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: social.google.client_id as string,
      client_secret: social.google.client_secret as string,
      code: code,
      redirect_uri: "http://localhost:5173/login",
      grant_type: "authorization_code",
    }),
  }).then(async (res) => await res.json());

  const response = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${access_token}` }
  });
  return await response.json();
}

async function login(code: string) {
  const response = await request(code);

  let user = await UserRepository.find(response, MainClient);
  if (user?.github_id) throw Error("You are registered with another platform, try Github.");

  if (!user) {
    return user = await UserRepository.create({
      username: response.name,
      email: response.email,
      google_id: (response.id as number).toString(),
    }, MainClient);
  }
  return user;
};

const GoogleService = { login, request };
export default GoogleService;