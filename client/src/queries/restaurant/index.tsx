import {
  IApiDataResponse,
  IApiErrorResponse,
  IRestaurantResponse,
} from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import { getRestaurantBySlug, getRestaurants } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetRestaurantsByParams = (categoryId: number | null) => {
  return useQuery<IApiDataResponse<IRestaurantResponse[]>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.RESTAURANT.GET_RESTAURANTS, categoryId],
    queryFn: () => getRestaurants(categoryId),
  });
};

export const useGetRestaurantBySlug = (slug: string) => {
  return useQuery<IApiDataResponse<IRestaurantResponse>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.RESTAURANT.GET_RESTAURANT_BY_SLUG],
    queryFn: () => getRestaurantBySlug(slug),
  });
};
