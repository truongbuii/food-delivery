import { BASE_RESTAURANT } from "@/apis/endPoints";
import createHttpClient from "@/apis/httpClient";
import { IApiDataResponse, IRestaurantResponse } from "@/interfaces";

const httpClient = createHttpClient();

export const getRestaurants = async (): Promise<
  IApiDataResponse<IRestaurantResponse[]>
> => {
  const resp = await httpClient.get<
    IRestaurantResponse[],
    IApiDataResponse<IRestaurantResponse[]>
  >(BASE_RESTAURANT);
  return resp;
};
