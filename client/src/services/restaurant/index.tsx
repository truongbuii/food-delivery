import { BASE_RESTAURANT } from "@/apis/endPoints";
import createHttpClient from "@/apis/httpClient";
import { IApiDataResponse, IRestaurantResponse } from "@/interfaces";

const httpClient = createHttpClient();

export const getRestaurants = async (
  categoryId: number | null
): Promise<IApiDataResponse<IRestaurantResponse[]>> => {
  const resp = await httpClient.get<
    IRestaurantResponse[],
    IApiDataResponse<IRestaurantResponse[]>
  >(BASE_RESTAURANT, {
    params: {
      categoryId,
    },
  });
  return resp;
};

export const getRestaurantBySlug = async (
  slug: string
): Promise<IApiDataResponse<IRestaurantResponse>> => {
  const resp = await httpClient.get<
    IRestaurantResponse,
    IApiDataResponse<IRestaurantResponse>
  >(`${BASE_RESTAURANT}/${slug}`);
  return resp;
};
