import { ref, Ref } from "vue";
import { HttpResponse } from "../utils/Fetcher";

export interface IUseFetch <DataDTO, BodyDTO> {
  error: Ref<string | undefined>;
  loading: Ref<boolean>;
  data: Ref<DataDTO | undefined>;
  fetch(body: BodyDTO): Promise<void>;
};

type FetcherType <DataDTO, BodyDTO> = (body: BodyDTO) => Promise<HttpResponse<DataDTO>>;

const useFetch = <DataDTO, BodyDTO> (fetcher: FetcherType<DataDTO, BodyDTO>) => {
  const error: Ref<string | undefined> = ref();
  const loading: Ref<boolean> = ref(false);
  const data: Ref<DataDTO | undefined> = ref();

  const fetch = async (body: BodyDTO) => {
    loading.value = true;
    const response = await fetcher(body);
    
    data.value = response.data;
    error.value = response.error;
    loading.value = false;
  };

  return { error, loading, data, fetch };
};

export default useFetch;