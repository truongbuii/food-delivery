import {
  IApiDataResponse,
  IApiErrorResponse,
  IChangePassword,
  IEmailPost,
  ISignIn,
  ISignUp,
  IUserResponse,
} from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import {
  changePasswordService,
  forgotPasswordService,
  signInService,
  signUpService,
} from "@/services";
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

export const useForgotPasswordMutation = () => {
  return useMutation<IApiDataResponse<any>, IApiErrorResponse, any>({
    mutationFn: (value: IEmailPost) => forgotPasswordService(value),
    mutationKey: [QUERIES_KEY.AUTH.FORGOT_PASSWORD],
  });
};

export const useChangePasswordMutation = () => {
  return useMutation<IApiDataResponse<any>, IApiErrorResponse, any>({
    mutationFn: (value: IChangePassword) => changePasswordService(value),
    mutationKey: [QUERIES_KEY.AUTH.CHANGE_PASSWORD],
  });
};
