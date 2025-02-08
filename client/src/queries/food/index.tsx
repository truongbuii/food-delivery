import {
  IApiDataResponse,
  IApiErrorResponse,
  IFoodResponse,
} from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import {
  getFoods,
  getFeaturedFoodsByRestaurantSlug,
  getFoodsByRestaurantAndCategory,
} from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetFoods = () => {
  return useQuery<IApiDataResponse<IFoodResponse[]>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.FOOD.GET_ALL],
    queryFn: () => getFoods(),
  });
};

export const useFeaturedFoods = (restaurantSlug: string) => {
  return useQuery<IApiDataResponse<IFoodResponse[]>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.FOOD.GET_FEATURED_BY_RESTAURANT_SLUG],
    queryFn: () => getFeaturedFoodsByRestaurantSlug(restaurantSlug),
  });
};

export const useGetFoodsByRestaurantAndCategory = (
  restaurantSlug: string,
  categoryId: number | null
) => {
  return useQuery<IApiDataResponse<IFoodResponse[]>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.FOOD.GET_BY_CATEGORY, categoryId],
    queryFn: () => getFoodsByRestaurantAndCategory(restaurantSlug, categoryId),
  });
};
