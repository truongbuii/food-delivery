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

export const getFoodBySlug = async (
  slug: string
): Promise<IApiDataResponse<IFoodResponse>> => {
  const resp = await httpClient.get<
    IFoodResponse,
    IApiDataResponse<IFoodResponse>
  >(`${BASE_FOOD}/${slug}`);
  return resp;
};

export const getFeaturedFoodsByRestaurantSlug = async (
  restaurantSlug: string
): Promise<IApiDataResponse<IFoodResponse[]>> => {
  const resp = await httpClient.get<
    IFoodResponse[],
    IApiDataResponse<IFoodResponse[]>
  >(`${BASE_FOOD}/featured/${restaurantSlug}`);
  return resp;
};

export const getFoodsByParams = async (
  categoryId: number | null,
  restaurantSlug: string | null,
  rating: number | null,
  keyword: string | null,
  popular: boolean | null,
  sortAsc: boolean | null,
  minPrice: number | null,
  maxPrice: number | null
): Promise<IApiDataResponse<IFoodResponse[]>> => {
  const resp = await httpClient.get<
    IFoodResponse[],
    IApiDataResponse<IFoodResponse[]>
  >(`${BASE_FOOD}/by-params`, {
    params: {
      restaurantSlug,
      categoryId,
      rating,
      keyword,
      popular,
      sortAsc,
      minPrice,
      maxPrice,
    },
  });
  return resp;
};
