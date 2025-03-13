import {
  IApiDataResponse,
  IApiErrorResponse,
  ICheckout,
  ICheckoutResponse,
  IOrderItemResponse,
  IOrderResponse,
  IOrderUpdate,
} from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import {
  checkoutService,
  getMyOrdersService,
  getOrderDetailService,
  getOrderItemsByOrderIdService,
  reOrderService,
  updateOrderService,
} from "@/services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCheckoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    IApiDataResponse<ICheckoutResponse>,
    IApiErrorResponse,
    ICheckout
  >({
    mutationKey: [QUERIES_KEY.ORDER.CHECKOUT],
    mutationFn: (value: ICheckout) => checkoutService(value),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERIES_KEY.CART.GET],
      });
    },
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

export const useGetOrderDetail = (orderId: number) => {
  return useQuery<IApiDataResponse<IOrderResponse>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.ORDER.GET_ORDER_DETAIL, orderId],
    queryFn: () => getOrderDetailService(orderId),
  });
};

export const useGetOrderItemsByOrderId = (orderId: number) => {
  return useQuery<IApiDataResponse<IOrderItemResponse[]>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.ORDER.GET_ORDER_ITEMS_BY_ORDER_ID, orderId],
    queryFn: () => getOrderItemsByOrderIdService(orderId),
  });
};
