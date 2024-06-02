import { type Environment } from "./config";

interface ISocial {
  client_id: Environment;
  client_secret: Environment;
  callback_url: Environment;
}

export const github: ISocial = {
  client_id: process.env.GITHUB_CLIENT_ID,
  client_secret: process.env.GITHUB_CLIENT_SECRET,
  callback_url: process.env.GITHUB_CALLBACK_URL,
};

export const google = {

};