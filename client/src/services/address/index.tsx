import { BASE_ADDRESS } from "@/apis/endPoints";
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
  >(`${BASE_ADDRESS}/user/${userId}`);
  return resp;
};

export const getDeliverAddrService = async (
  addressId: number
): Promise<IApiDataResponse<IDeliveryAddress>> => {
  const resp = await httpClient.get<
    IDeliveryAddress,
    IApiDataResponse<IDeliveryAddress>
  >(`${BASE_ADDRESS}/${addressId}`);
  return resp;
};

export const createDeliverAddrService = async (
  value: IDeliveryAddressPost
): Promise<IApiDataResponse<IDeliveryAddressResponse>> => {
  const resp = await httpClient.post<
    IDeliveryAddressResponse,
    IApiDataResponse<IDeliveryAddressResponse>
  >(BASE_ADDRESS, {
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
  >(BASE_ADDRESS, {
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
    `${BASE_ADDRESS}/${addressId}`
  );
  return resp;
};
