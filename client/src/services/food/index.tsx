import { BASE_FOOD } from "@/apis/endPoints";
import createHttpClient from "@/apis/httpClient";
import { IApiDataResponse, IFoodResponse } from "@/interfaces";

const httpClient = createHttpClient();

export const getFoods = async (): Promise<
  IApiDataResponse<IFoodResponse[]>
> => {
  const resp = await httpClient.get<
    IFoodResponse[],
    IApiDataResponse<IFoodResponse[]>
  >(BASE_FOOD);
  return resp;
};
