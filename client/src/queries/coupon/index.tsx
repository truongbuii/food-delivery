import {
  IApiDataResponse,
  IApiErrorResponse,
  ICouponApply,
  ICouponResponse,
} from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import { getCouponService } from "@/services/coupon";
import { useMutation } from "@tanstack/react-query";

export const useGetCouponMutation = () => {
  return useMutation<
    IApiDataResponse<ICouponResponse>,
    IApiErrorResponse,
    ICouponApply
  >({
    mutationKey: [QUERIES_KEY.COUPON.GET],
    mutationFn: (value: ICouponApply) => getCouponService(value),
  });
};
