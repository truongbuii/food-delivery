import {
  IApiDataResponse,
  IApiErrorResponse,
  IRestaurantResponse,
} from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import { getRestaurants } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetRestaurants = () => {
  return useQuery<IApiDataResponse<IRestaurantResponse[]>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.RESTAURANT.GET_RESTAURANTS],
    queryFn: () => getRestaurants(),
  });
};
