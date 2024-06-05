import { type Request, type Response } from "express";

import RequestHandler from "../handlers/RequestHandler";
import { AuthService } from "../../services";
import Tokens from "../../utils/tokens";
import social from "../../config/social";

const register = RequestHandler(async (req) => {
  const user = await AuthService.createUser(req.body);
  const token = await Tokens.create({ id: user.id });

  return {
    data: { jwt: token, type: "Bearer" }
  };
});

const login = RequestHandler(async (req) => {
  const user = await AuthService.loginUser(req.body);
  const token = await Tokens.create({ id: user.id });

  return {
    data: { jwt: token, type: "Bearer" }
  };
});





const github = async (req: Request, res: Response) => {
  const code = req.query.code;
  console.log(code);
  
  const params: string = `?client_id=${social.github.client_id}&client_secret=${social.github.client_secret}&code=${code}`;

  const { access_token } = await fetch(`https://github.com/login/oauth/access_token${params}`, {
    headers: { "Accept": "application/json" }
  }).then(async (res) => await res.json());

  console.log(access_token);
  const response = await fetch("https://api.github.com/user", {
    headers: { "Authorization": `Bearer ${access_token}` }
  }).then(async (res) => await res.json());

  console.log(response);
  res.redirect("http://localhost:5173/login");
};

const google = async (req: Request, res: Response) => {
  const code = req.query.code;
  console.log(code);
};

export default Object.freeze({ register, login, github, google });