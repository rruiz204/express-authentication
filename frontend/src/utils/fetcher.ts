import Options from "../types/utils/fetcher";

const Fetcher = async <Type>(url: string, options: Options): Promise<Type> => {
  const { method, headers, body } = options;

  const request: RequestInit = {
    method: method,
    headers: headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(url, request);
  return await response.json() as Type;
}

export default Fetcher;