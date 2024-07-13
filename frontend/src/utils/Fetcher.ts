import { BASE_URL } from "../env";

export interface HttpResponse<DataDTO> {
  data?: DataDTO;
  error?: string;
};

interface Interceptors<DataDTO> {
  request?: (options: RequestInit) => Promise<any> | any;
  response?: (parameters: DataDTO) => Promise<any> | any;
};

const Fetcher = async <DataDTO>(
  endpoint: string,
  options: RequestInit,
  interceptor: Interceptors<DataDTO>
) => {
  const URL = BASE_URL + endpoint;
  try {
    if (interceptor.request) {
      const requestInterceptor = interceptor.request(options);
      if (requestInterceptor instanceof Promise) await requestInterceptor;
    };

    const response = await fetch(URL, options);
    const payload = await response.json() as HttpResponse<DataDTO>

    if (interceptor.response && payload.data) {
      const responseInterceptor = interceptor.response(payload.data);
      if (responseInterceptor instanceof Promise) await responseInterceptor;
    };

    return payload;
  } catch (error) {
    return { error: (error as Error).message };
  };
};

export default Fetcher;