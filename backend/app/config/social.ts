import { type Environment } from "./app";

interface ISocial {
  client_id: Environment;
  client_secret: Environment;
  callback_url: Environment;
}

const github: ISocial = {
  client_id: process.env.GITHUB_CLIENT_ID,
  client_secret: process.env.GITHUB_CLIENT_SECRET,
  callback_url: process.env.GITHUB_CALLBACK_URL,
};

const google: ISocial = {
  client_id: process.env.GOOGLE_CLIENT_ID,
  client_secret: process.env.GOOGLE_CLIENT_SECRET,
  callback_url: process.env.GOOGLE_CALLBACK_URL,
};

const social = {
  github: { ...github },
  google: { ...google },
};

export default social;