import {
  IApiDataResponse,
  IApiErrorResponse,
  ISignIn,
  ISignUp,
  IUserResponse,
} from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import { signInService, signUpService } from "@/services";
import { useMutation } from "@tanstack/react-query";

export const useSignUpMutation = () => {
  return useMutation<IApiDataResponse<IUserResponse>, IApiErrorResponse, any>({
    mutationFn: (value: ISignUp) => signUpService(value),
    mutationKey: [QUERIES_KEY.AUTH.SIGN_UP],
  });
};

export const useSignInMutation = () => {
  return useMutation<IApiDataResponse<IUserResponse>, IApiErrorResponse, any>({
    mutationFn: (value: ISignIn) => signInService(value),
    mutationKey: [QUERIES_KEY.AUTH.SIGN_IN],
  });
};
