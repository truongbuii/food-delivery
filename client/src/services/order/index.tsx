import { EndPoints } from "@/apis";
import createHttpClient from "@/apis/httpClient";
import { IApiDataResponse, ICheckout } from "@/interfaces";

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
