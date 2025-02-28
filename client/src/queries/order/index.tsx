import { IApiDataResponse, IApiErrorResponse, ICheckout } from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import { checkoutService } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useCheckoutMutation = () => {
  return useMutation<IApiDataResponse<string>, IApiErrorResponse, ICheckout>({
    mutationKey: [QUERIES_KEY.ORDER.CHECKOUT],
    mutationFn: (value: ICheckout) => checkoutService(value),
  });
};
