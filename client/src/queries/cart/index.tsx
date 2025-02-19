import {
  IApiDataResponse,
  IApiErrorResponse,
  ICartItem,
  ICartItemResponse,
} from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import {
  getCartItemsService,
  removeCartItemService,
  updateCartItemService,
} from "@/services/cart";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCartItems = () => {
  return useQuery<IApiDataResponse<ICartItemResponse[]>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.CART.GET],
    queryFn: () => getCartItemsService(),
  });
};

export const useRemoveCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation<IApiDataResponse<void>, IApiErrorResponse, number>({
    mutationKey: [QUERIES_KEY.CART.DELETE],
    mutationFn: (id: number) => removeCartItemService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES_KEY.CART.GET] });
    },
  });
};

export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiDataResponse<ICartItemResponse>,
    IApiErrorResponse,
    ICartItem
  >({
    mutationKey: [QUERIES_KEY.CART.UPDATE],
    mutationFn: (value: ICartItem) => updateCartItemService(value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES_KEY.CART.GET] });
    },
  });
};
