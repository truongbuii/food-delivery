import { BASE_RESTAURANT } from "@/apis/endPoints";
import createHttpClient from "@/apis/httpClient";
import { IApiDataResponse, IRestaurantResponse } from "@/interfaces";

const httpClient = createHttpClient();

export const getRestaurants = async (
  categoryId: number | null,
  rating: number | null,
  keyword: string | null,
  freeDelivery: boolean | null,
  popular: boolean | null
): Promise<IApiDataResponse<IRestaurantResponse[]>> => {
  const resp = await httpClient.get<
    IRestaurantResponse[],
    IApiDataResponse<IRestaurantResponse[]>
  >(BASE_RESTAURANT, {
    params: {
      categoryId,
      rating,
      keyword,
      freeDelivery,
      popular,
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
