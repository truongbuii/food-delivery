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

export const getFeaturedFoodsByRestaurantSlug = async (
  restaurantSlug: string
): Promise<IApiDataResponse<IFoodResponse[]>> => {
  const resp = await httpClient.get<
    IFoodResponse[],
    IApiDataResponse<IFoodResponse[]>
  >(`${BASE_FOOD}/featured/${restaurantSlug}`);
  return resp;
};

export const getFoodsByRestaurantAndCategory = async (
  restaurantSlug: string,
  categoryId: number | null
): Promise<IApiDataResponse<IFoodResponse[]>> => {
  const resp = await httpClient.get<
    IFoodResponse[],
    IApiDataResponse<IFoodResponse[]>
  >(`${BASE_FOOD}/by-category`, { params: { restaurantSlug, categoryId } });
  return resp;
};
