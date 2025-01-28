import { EndPoints } from "@/apis";
import createHttpClient from "@/apis/httpClient";
import {
  IApiDataResponse,
  IDeliveryAddress,
  IDeliveryAddressPost,
  IDeliveryAddressResponse,
} from "@/interfaces";

const httpClient = createHttpClient();

export const getAllDeliverAddrService = async (
  userId: number
): Promise<IApiDataResponse<IDeliveryAddressResponse[]>> => {
  const resp = await httpClient.get<
    IDeliveryAddressResponse[],
    IApiDataResponse<IDeliveryAddressResponse[]>
  >(EndPoints.ADDRESS.getAll, { params: { userId: userId } });
  return resp;
};

export const getDeliverAddrService = async (
  addressId: number
): Promise<IApiDataResponse<IDeliveryAddress>> => {
  const resp = await httpClient.get<
    IDeliveryAddress,
    IApiDataResponse<IDeliveryAddress>
  >(EndPoints.ADDRESS.get, { params: { addressId: addressId } });
  return resp;
};

export const createDeliverAddrService = async (
  value: IDeliveryAddressPost
): Promise<IApiDataResponse<IDeliveryAddressResponse>> => {
  const resp = await httpClient.post<
    IDeliveryAddressResponse,
    IApiDataResponse<IDeliveryAddressResponse>
  >(EndPoints.ADDRESS.create, {
    userId: value.userId,
    name: value.name,
    phoneNumber: value.phoneNumber,
    state: value.state,
    city: value.city,
    street: value.street,
  });
  return resp;
};

export const updateDeliverAddrService = async (
  value: IDeliveryAddress
): Promise<IApiDataResponse<IDeliveryAddressResponse>> => {
  const resp = await httpClient.put<
    IDeliveryAddressResponse,
    IApiDataResponse<IDeliveryAddressResponse>
  >(EndPoints.ADDRESS.update, {
    id: value.id,
    name: value.name,
    phoneNumber: value.phoneNumber,
    state: value.state,
    city: value.city,
    street: value.street,
  });
  return resp;
};

export const deleteDeliverAddrService = async (
  addressId: number
): Promise<IApiDataResponse<void>> => {
  const resp = await httpClient.delete<number, IApiDataResponse<void>>(
    `${EndPoints.ADDRESS.delete}/${addressId}`
  );
  return resp;
};
