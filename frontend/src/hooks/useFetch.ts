import { ref } from "vue";
import { BASE_URL } from "../env";

export interface IJson <Response> {
  data?: Response;
  error?: string;
}

const useFetch = () => {
  const error = ref();
  const loading = ref(false);
  const data = ref();

  const fetcher = async <Response> (endpoint: string, options: RequestInit) => {
    const URL = BASE_URL + endpoint;
    loading.value = true;

    const response = await fetch(URL, options);
    const json: IJson <Response> = await response.json();

    error.value = json.error;
    data.value = json.data;

    loading.value = false;
  };

  return { error, loading, data, fetcher }
};

export default useFetch;