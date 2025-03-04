import { EndPoints } from "@/apis";
import createHttpClient from "@/apis/httpClient";
import {
  IApiDataResponse,
  ICheckout,
  IOrderResponse,
  IOrderUpdate,
} from "@/interfaces";

const httpClient = createHttpClient();

export const checkoutService = async (
  value: ICheckout
): Promise<IApiDataResponse<string>> => {
  const resp = await httpClient.post<ICheckout, IApiDataResponse<string>>(
    EndPoints.ORDER.checkout,
    {
      paymentMethod: value.paymentMethod,
      orderAddress: value.address,
      discount: value.discount,
      totalPrice: value.totalPrice,
      numberItem: value.numberItem,
    }
  );
  return resp;
};

export const getMyOrdersService = async (): Promise<
  IApiDataResponse<IOrderResponse[]>
> => {
  const resp = await httpClient.get<
    IOrderResponse[],
    IApiDataResponse<IOrderResponse[]>
  >(EndPoints.ORDER.myOrders);
  return resp;
};

export const updateOrderService = async (
  value: IOrderUpdate
): Promise<IApiDataResponse<IOrderResponse>> => {
  const resp = await httpClient.patch<
    IOrderResponse,
    IApiDataResponse<IOrderResponse>
  >(EndPoints.ORDER.update, {
    orderId: value.id,
    status: value.status,
  });
  return resp;
};

export const reOrderService = async (
  value: number
): Promise<IApiDataResponse<void>> => {
  const resp = await httpClient.post<number, IApiDataResponse<void>>(
    EndPoints.ORDER.reOrder,
    {
      orderId: value,
    }
  );
  return resp;
};
