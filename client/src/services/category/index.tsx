import { BASE_CATEGORY } from "@/apis/endPoints";
import createHttpClient from "@/apis/httpClient";
import { IApiDataResponse, ICategoryResponse } from "@/interfaces";

const httpClient = createHttpClient();

export const getCategoriesService = async (): Promise<
  IApiDataResponse<ICategoryResponse[]>
> => {
  const resp = await httpClient.get<
    ICategoryResponse,
    IApiDataResponse<ICategoryResponse[]>
  >(BASE_CATEGORY);
  return resp;
};
