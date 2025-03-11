import { BASE_COUPON } from "@/apis/endPoints";
import createHttpClient from "@/apis/httpClient";
import { IApiDataResponse, ICouponApply, ICouponResponse } from "@/interfaces";

const httpClient = createHttpClient();

export const getCouponService = async (
  value: ICouponApply
): Promise<IApiDataResponse<ICouponResponse>> => {
  const resp = await httpClient.post<
    ICouponApply,
    IApiDataResponse<ICouponResponse>
  >(`${BASE_COUPON}/apply`, {
    code: value.code,
    subtotal: value.subTotal,
  });
  return resp;
};
