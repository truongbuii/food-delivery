import {
  IApiDataResponse,
  IApiErrorResponse,
  IFoodResponse,
} from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import { getFoods } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetFoods = () => {
  return useQuery<IApiDataResponse<IFoodResponse[]>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.FOOD.GET_ALL],
    queryFn: () => getFoods(),
  });
};
