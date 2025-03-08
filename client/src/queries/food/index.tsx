import {
  IApiDataResponse,
  IApiErrorResponse,
  IFoodResponse,
  IRating,
  IReviewResponse,
} from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import {
  getFoods,
  getFeaturedFoodsByRestaurantSlug,
  getFoodsByParams,
  getFoodBySlug,
  toggleFavoriteFoodService,
  getFavoriteFoods,
  ratingFoodService,
  editMyFoodReview,
  getFoodReviewsService,
  deleteMyFoodReview,
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
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEY.FOOD.GET_FEATURED_BY_RESTAURANT_SLUG],
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

export const useRatingFoodMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiDataResponse<IReviewResponse>,
    IApiErrorResponse,
    IRating
  >({
    mutationKey: [QUERIES_KEY.FOOD.FOOD_RATING],
    mutationFn: (value: IRating) => ratingFoodService(value),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEY.FOOD.LIST_FOOD_REVIEWS],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEY.FOOD.GET_ALL],
      });
    },
  });
};

export const useEditFoodReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiDataResponse<IReviewResponse>,
    IApiErrorResponse,
    IRating
  >({
    mutationKey: [QUERIES_KEY.FOOD.EDIT_FOOD_REVIEW],
    mutationFn: (value: IRating) => editMyFoodReview(value),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEY.FOOD.LIST_FOOD_REVIEWS],
      });
    },
  });
};

export const useGetFoodReviews = (foodSlug: string) => {
  return useQuery<IApiDataResponse<IReviewResponse[]>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.FOOD.LIST_FOOD_REVIEWS, foodSlug],
    queryFn: () => getFoodReviewsService(foodSlug),
  });
};

export const useDeleteFoodReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<IApiDataResponse<void>, IApiErrorResponse, number>({
    mutationKey: [QUERIES_KEY.FOOD.DELETE_FOOD_REVIEW],
    mutationFn: (value: number) => deleteMyFoodReview(value),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEY.FOOD.LIST_FOOD_REVIEWS],
      });
    },
  });
};
