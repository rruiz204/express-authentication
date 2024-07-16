import { ref, Ref } from "vue";
import { HttpResponse } from "../utils/Fetcher";

type FetcherType <DataDTO, BodyDTO> = (body: BodyDTO) => Promise<HttpResponse<DataDTO>>;

const useFetch = <DataDTO, BodyDTO> () => {
  const error: Ref<string | undefined> = ref();
  const loading: Ref<boolean> = ref(false);
  const data: Ref<DataDTO | undefined> = ref();

  const execute = async (fetcher: FetcherType<DataDTO, BodyDTO>, body: BodyDTO) => {
    loading.value = true;
    error.value = undefined;

    const response = await fetcher(body);
    data.value = response.data;

    error.value = response.error;
    loading.value = false;
  };

  return { error, loading, data, execute };
};

export default useFetch;