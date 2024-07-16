import { BASE_URL } from "../env";

export interface HttpResponse<DataDTO> {
  data?: DataDTO;
  error?: string;
};

const Fetcher = async <DataDTO> (fetcher: () => Promise<Response>) => {
  try {
    const response = await fetcher();
    return await response.json() as HttpResponse<DataDTO>;
  } catch (error) {
    return { error: (error as Error).message };
  };
};

export const FetcherFactory = (endpoint: string, options: RequestInit) => {
  const URL = BASE_URL + endpoint;
  return async () => fetch(URL, options);
};

export default Fetcher;