import { BASE_URL } from "../env";

const Fetcher = async <Response> (endpoint: string, options: RequestInit): Promise<Response> => {
  const url: string = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, options);
  return await response.json();
};

export default Fetcher;