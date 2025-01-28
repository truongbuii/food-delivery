import {
  IApiDataResponse,
  IApiErrorResponse,
  IDeliveryAddress,
  IDeliveryAddressPost,
  IDeliveryAddressResponse,
} from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import {
  createDeliverAddrService,
  deleteDeliverAddrService,
  getAllDeliverAddrService,
  getDeliverAddrService,
  updateDeliverAddrService,
} from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetAllDeliverAddr = (userId: number) => {
  return useQuery<
    IApiDataResponse<IDeliveryAddressResponse[]>,
    IApiErrorResponse
  >({
    queryKey: [QUERIES_KEY.ADDRESS.GET_ALL],
    queryFn: () => getAllDeliverAddrService(userId),
  });
};

export const useGetDeliverAddr = (addressId: number) => {
  return useQuery<IApiDataResponse<IDeliveryAddress>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.ADDRESS.GET],
    queryFn: () => getDeliverAddrService(addressId),
  });
};

export const useCreateDeliverAddrMutation = () => {
  return useMutation<
    IApiDataResponse<IDeliveryAddressResponse>,
    IApiErrorResponse,
    IDeliveryAddressPost
  >({
    mutationFn: (value: IDeliveryAddressPost) =>
      createDeliverAddrService(value),
    mutationKey: [QUERIES_KEY.ADDRESS.CREATE],
  });
};

export const useUpdateDeliverAddrMutation = () => {
  return useMutation<
    IApiDataResponse<IDeliveryAddressResponse>,
    IApiErrorResponse,
    IDeliveryAddress
  >({
    mutationFn: (value: IDeliveryAddress) => updateDeliverAddrService(value),
    mutationKey: [QUERIES_KEY.ADDRESS.UPDATE],
  });
};

export const useDeleteDeliverAddrMutation = () => {
  return useMutation<IApiDataResponse<void>, IApiErrorResponse, number>({
    mutationFn: (addressId: number) => deleteDeliverAddrService(addressId),
    mutationKey: [QUERIES_KEY.ADDRESS.DELETE],
  });
};
