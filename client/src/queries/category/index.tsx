import {
  IApiDataResponse,
  IApiErrorResponse,
  ICategoryResponse,
} from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import { getCategoriesService } from "@/services";
import { useQuery } from "@tanstack/react-query";

export const useGetCategories = () => {
  return useQuery<IApiDataResponse<ICategoryResponse[]>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.CATEGORY.GET_ALL],
    queryFn: () => getCategoriesService(),
  });
};
