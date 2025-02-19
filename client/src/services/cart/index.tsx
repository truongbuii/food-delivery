import { BASE_CART } from "@/apis/endPoints";
import createHttpClient from "@/apis/httpClient";
import { IApiDataResponse, ICartItem, ICartItemResponse } from "@/interfaces";

const httpClient = createHttpClient();

export const getCartItemsService = async (): Promise<
  IApiDataResponse<ICartItemResponse[]>
> => {
  const resp = await httpClient.get<
    ICartItemResponse[],
    IApiDataResponse<ICartItemResponse[]>
  >(BASE_CART);
  return resp;
};

export const removeCartItemService = async (
  id: number
): Promise<IApiDataResponse<void>> => {
  const resp = await httpClient.delete<number, IApiDataResponse<void>>(
    `${BASE_CART}/${id}`
  );
  return resp;
};

export const updateCartItemService = async (
  value: ICartItem
): Promise<IApiDataResponse<ICartItemResponse>> => {
  const resp = await httpClient.patch<
    ICartItem,
    IApiDataResponse<ICartItemResponse>
  >(BASE_CART, {
    cartItemId: value.cartItemId,
    foodId: value.foodId,
    quantity: value.quantity,
  });
  return resp;
};
