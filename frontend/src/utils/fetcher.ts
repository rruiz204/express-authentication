import { BASE_URL } from "../env";

const Fetcher = async <T> (endpoint: string, options: RequestInit): Promise<T> => {
  const url = `${BASE_URL}${endpoint}`;
  const response = await fetch(url, options);
  return await response.json();
};

export default Fetcher;