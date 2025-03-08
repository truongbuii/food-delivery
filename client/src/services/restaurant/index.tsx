import { BASE_RESTAURANT } from "@/apis/endPoints";
import createHttpClient from "@/apis/httpClient";
import {
  IApiDataResponse,
  IRating,
  IRestaurantResponse,
  IReviewResponse,
} from "@/interfaces";

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

export const toggleFavoriteRestaurant = async (
  value: number
): Promise<IApiDataResponse<IRestaurantResponse[]>> => {
  const resp = await httpClient.put<
    IRestaurantResponse[],
    IApiDataResponse<IRestaurantResponse[]>
  >(
    `${BASE_RESTAURANT}/favorite`,
    {},
    {
      params: {
        restaurantId: value,
      },
    }
  );
  return resp;
};

export const getFavoriteRestaurants = async (): Promise<
  IApiDataResponse<IRestaurantResponse[]>
> => {
  const resp = await httpClient.get<
    IRestaurantResponse[],
    IApiDataResponse<IRestaurantResponse[]>
  >(`${BASE_RESTAURANT}/my-favorite`);
  return resp;
};

export const ratingRestaurantService = async (
  value: IRating
): Promise<IApiDataResponse<IReviewResponse>> => {
  const resp = await httpClient.post<
    IRating,
    IApiDataResponse<IReviewResponse>
  >(`${BASE_RESTAURANT}/review`, {
    restaurantId: value.subjectId,
    rating: value.rating,
    comment: value.comment,
  });
  return resp;
};

export const getRestaurantReviews = async (
  restaurantSlug: string
): Promise<IApiDataResponse<IReviewResponse[]>> => {
  const resp = await httpClient.get<
    IReviewResponse[],
    IApiDataResponse<IReviewResponse[]>
  >(`${BASE_RESTAURANT}/reviews`, {
    params: {
      restaurantSlug,
    },
  });
  return resp;
};

export const deleteMyReview = async (
  reviewId: number
): Promise<IApiDataResponse<void>> => {
  const resp = await httpClient.delete<number, IApiDataResponse<void>>(
    `${BASE_RESTAURANT}/delete-review`,
    {
      params: {
        reviewId,
      },
    }
  );
  return resp;
};

export const editMyRestaurantReview = async (
  value: IRating
): Promise<IApiDataResponse<IReviewResponse>> => {
  const resp = await httpClient.put<IRating, IApiDataResponse<IReviewResponse>>(
    `${BASE_RESTAURANT}/edit-review`,
    {
      reviewId: value.subjectId,
      rating: value.rating,
      comment: value.comment,
    }
  );
  return resp;
};
