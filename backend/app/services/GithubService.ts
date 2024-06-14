import social from "../config/social";

async function GithubService(code: string) {
  const client_id = `client_id=${social.github.client_id}`;
  const client_secret = `client_secret=${social.github.client_secret}`;
  const params = `?${client_id}&${client_secret}&code=${code}`;

  const { access_token } = await fetch(`https://github.com/login/oauth/access_token${params}`, {
    headers: { "Accept": "application/json" }
  }).then(async (res) => await res.json());

  const response = await fetch("https://api.github.com/user", {
    headers: { "Authorization": `Bearer ${access_token}` }
  }).then(async (res) => await res.json());

  console.log(response);
};

export default GithubService;