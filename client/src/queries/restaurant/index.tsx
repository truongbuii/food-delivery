import {
  IApiDataResponse,
  IApiErrorResponse,
  IRestaurantResponse,
} from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import {
  getFavoriteRestaurants,
  getRestaurantBySlug,
  getRestaurants,
  toggleFavoriteRestaurant,
} from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useToggleFavoriteRestaurantMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiDataResponse<IRestaurantResponse[]>,
    IApiErrorResponse,
    number
  >({
    mutationKey: [QUERIES_KEY.RESTAURANT.TOGGLE_FAVORITE],
    mutationFn: (value: number) => toggleFavoriteRestaurant(value),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEY.RESTAURANT.GET_FAVORITE],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEY.RESTAURANT.GET_RESTAURANT_BY_SLUG],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEY.RESTAURANT.GET_RESTAURANTS],
      });
    },
  });
};

export const useGetFavoriteRestaurants = () => {
  return useQuery<IApiDataResponse<IRestaurantResponse[]>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.RESTAURANT.GET_FAVORITE],
    queryFn: () => getFavoriteRestaurants(),
  });
};
