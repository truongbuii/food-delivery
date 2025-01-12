import {
  IApiDataResponse,
  IApiErrorResponse,
  IChangePassword,
  IEmailPost,
  IPhoneRegister,
  ISignIn,
  ISignUp,
  ISocialLogin,
  IUserResponse,
  IVerificationEmail,
} from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import {
  changePasswordService,
  exchangeOauthTokenForToken,
  forgotPasswordService,
  getOauthUrl,
  phoneRegisterService,
  reSendOtpService,
  signInService,
  signUpService,
  verificationEmailService,
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

export const useVerificationEmailMutation = () => {
  return useMutation<IApiDataResponse<IUserResponse>, IApiErrorResponse, any>({
    mutationFn: (value: IVerificationEmail) => verificationEmailService(value),
    mutationKey: [QUERIES_KEY.AUTH.VERIFICATION_EMAIL],
  });
};

export const useResendOtpMutation = () => {
  return useMutation<IApiDataResponse<any>, IApiErrorResponse, any>({
    mutationFn: (value: IEmailPost) => reSendOtpService(value),
    mutationKey: [QUERIES_KEY.AUTH.SEND_OTP],
  });
};

export const usePhoneRegisterMutation = () => {
  return useMutation<IApiDataResponse<IUserResponse>, IApiErrorResponse, any>({
    mutationFn: (value: IPhoneRegister) => phoneRegisterService(value),
    mutationKey: [QUERIES_KEY.AUTH.PHONE_REGISTER],
  });
};

export const useOauthLogin = () => {
  return useMutation({
    mutationFn: (provider: string) => getOauthUrl(provider),
  });
};

export const useExchangeOauthCodeForToken = () => {
  return useMutation<IApiDataResponse<IUserResponse>, IApiErrorResponse, any>({
    mutationFn: (value: ISocialLogin) => exchangeOauthTokenForToken(value),
    mutationKey: [QUERIES_KEY.AUTH.SOCIAL_CALLBACK],
  });
};
