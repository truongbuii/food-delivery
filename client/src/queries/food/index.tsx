import {
  IApiDataResponse,
  IApiErrorResponse,
  IFoodResponse,
} from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import {
  getFoods,
  getFeaturedFoodsByRestaurantSlug,
  getFoodsByParams,
  getFoodBySlug,
  toggleFavoriteFoodService,
  getFavoriteFoods,
} from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetFoods = () => {
  return useQuery<IApiDataResponse<IFoodResponse[]>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.FOOD.GET_ALL],
    queryFn: () => getFoods(),
  });
};

export const useGetFoodBySlug = (slug: string) => {
  return useQuery<IApiDataResponse<IFoodResponse>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.FOOD.GET_BY_SLUG],
    queryFn: () => getFoodBySlug(slug),
  });
};

export const useFeaturedFoods = (restaurantSlug: string) => {
  return useQuery<IApiDataResponse<IFoodResponse[]>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.FOOD.GET_FEATURED_BY_RESTAURANT_SLUG],
    queryFn: () => getFeaturedFoodsByRestaurantSlug(restaurantSlug),
  });
};

export const useGetFoodsByParams = (
  categoryId: number | null,
  restaurantSlug: string | null,
  rating: number | null,
  keyword: string | null,
  popular: boolean | null,
  sortAsc: boolean | null,
  minPrice: number | null,
  maxPrice: number | null
) => {
  return useQuery<IApiDataResponse<IFoodResponse[]>, IApiErrorResponse>({
    queryKey: [
      QUERIES_KEY.FOOD.GET_BY_PARAMS,
      categoryId,
      restaurantSlug,
      rating,
      keyword,
      popular,
      sortAsc,
      minPrice,
      maxPrice,
    ],
    queryFn: () =>
      getFoodsByParams(
        categoryId,
        restaurantSlug,
        rating,
        keyword,
        popular,
        sortAsc,
        minPrice,
        maxPrice
      ),
  });
};

export const useToggleFavoriteFoodMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiDataResponse<IFoodResponse[]>,
    IApiErrorResponse,
    number
  >({
    mutationKey: [QUERIES_KEY.FOOD.TOGGLE_FAVORITE],
    mutationFn: (value: number) => toggleFavoriteFoodService(value),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEY.FOOD.GET_FAVORITE],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEY.FOOD.GET_BY_SLUG],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEY.FOOD.GET_BY_PARAMS],
      });
    },
  });
};

export const useGetFavoriteFoods = () => {
  return useQuery<IApiDataResponse<IFoodResponse[]>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.FOOD.GET_FAVORITE],
    queryFn: () => getFavoriteFoods(),
  });
};
