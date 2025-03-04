import {
  IApiDataResponse,
  IApiErrorResponse,
  ICheckout,
  IOrderResponse,
  IOrderUpdate,
} from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import {
  checkoutService,
  getMyOrdersService,
  reOrderService,
  updateOrderService,
} from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCheckoutMutation = () => {
  return useMutation<IApiDataResponse<string>, IApiErrorResponse, ICheckout>({
    mutationKey: [QUERIES_KEY.ORDER.CHECKOUT],
    mutationFn: (value: ICheckout) => checkoutService(value),
  });
};

export const useMyOrdersQuery = () => {
  return useQuery<IApiDataResponse<IOrderResponse[]>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.ORDER.GET_MY_ORDERS],
    queryFn: getMyOrdersService,
  });
};

export const useUpdateOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiDataResponse<IOrderResponse>,
    IApiErrorResponse,
    IOrderUpdate
  >({
    mutationKey: [QUERIES_KEY.ORDER.UPDATE_ORDER],
    mutationFn: (value: IOrderUpdate) => updateOrderService(value),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEY.ORDER.GET_MY_ORDERS],
      });
    },
  });
};

export const useReOrderMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<IApiDataResponse<void>, IApiErrorResponse, number>({
    mutationKey: [QUERIES_KEY.ORDER.RE_ORDER],
    mutationFn: (value: number) => reOrderService(value),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEY.CART.GET],
      });
    },
  });
};
