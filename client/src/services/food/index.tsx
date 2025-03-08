import { BASE_FOOD } from "@/apis/endPoints";
import createHttpClient from "@/apis/httpClient";
import {
  IApiDataResponse,
  IFoodResponse,
  IRating,
  IReviewResponse,
} from "@/interfaces";

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

export const toggleFavoriteFoodService = async (
  value: number
): Promise<IApiDataResponse<IFoodResponse[]>> => {
  const resp = await httpClient.put<
    IFoodResponse[],
    IApiDataResponse<IFoodResponse[]>
  >(
    `${BASE_FOOD}/favorite`,
    {},
    {
      params: {
        foodId: value,
      },
    }
  );
  return resp;
};

export const getFavoriteFoods = async (): Promise<
  IApiDataResponse<IFoodResponse[]>
> => {
  const resp = await httpClient.get<
    IFoodResponse[],
    IApiDataResponse<IFoodResponse[]>
  >(`${BASE_FOOD}/my-favorite`);
  return resp;
};

export const ratingFoodService = async (
  value: IRating
): Promise<IApiDataResponse<IReviewResponse>> => {
  const resp = await httpClient.post<
    IRating,
    IApiDataResponse<IReviewResponse>
  >(`${BASE_FOOD}/review`, {
    foodId: value.subjectId,
    rating: value.rating,
    comment: value.comment,
  });
  return resp;
};

export const editMyFoodReview = async (
  value: IRating
): Promise<IApiDataResponse<IReviewResponse>> => {
  const resp = await httpClient.put<IRating, IApiDataResponse<IReviewResponse>>(
    `${BASE_FOOD}/edit-review`,
    {
      reviewId: value.subjectId,
      rating: value.rating,
      comment: value.comment,
    }
  );
  return resp;
};

export const getFoodReviewsService = async (
  foodSlug: string
): Promise<IApiDataResponse<IReviewResponse[]>> => {
  const resp = await httpClient.get<
    IReviewResponse[],
    IApiDataResponse<IReviewResponse[]>
  >(`${BASE_FOOD}/reviews`, {
    params: {
      foodSlug,
    },
  });
  return resp;
};

export const deleteMyFoodReview = async (
  reviewId: number
): Promise<IApiDataResponse<void>> => {
  const resp = await httpClient.delete<number, IApiDataResponse<void>>(
    `${BASE_FOOD}/delete-review`,
    {
      params: {
        reviewId,
      },
    }
  );
  return resp;
};
