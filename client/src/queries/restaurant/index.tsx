import {
  IApiDataResponse,
  IApiErrorResponse,
  IRestaurantResponse,
} from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import { getRestaurantBySlug, getRestaurants } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetRestaurantsByParams = (
  categoryId: number | null,
  rating: number | null,
  keyword: string | null,
  freeDelivery: boolean | null,
  popular: boolean | null
) => {
  return useQuery<IApiDataResponse<IRestaurantResponse[]>, IApiErrorResponse>({
    queryKey: [
      QUERIES_KEY.RESTAURANT.GET_RESTAURANTS,
      categoryId,
      rating,
      keyword,
      freeDelivery,
      popular,
    ],
    queryFn: () =>
      getRestaurants(categoryId, rating, keyword, freeDelivery, popular),
  });
};

export const useGetRestaurantBySlug = (slug: string) => {
  return useQuery<IApiDataResponse<IRestaurantResponse>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.RESTAURANT.GET_RESTAURANT_BY_SLUG],
    queryFn: () => getRestaurantBySlug(slug),
  });
};
