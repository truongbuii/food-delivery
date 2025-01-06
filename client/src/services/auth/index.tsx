import { EndPoints } from "@/apis";
import createHttpClient from "@/apis/httpClient";
import {
  IApiDataResponse,
  IChangePassword,
  IEmailPost,
  IPhoneRegister,
  ISendOtp,
  ISignIn,
  ISignUp,
  IUserResponse,
  IVerificationEmail,
} from "@/interfaces";

const httpClient = createHttpClient();

export const signUpService = async (
  value: ISignUp
): Promise<IApiDataResponse<IUserResponse>> => {
  const resp = await httpClient.post<ISignUp, IApiDataResponse<IUserResponse>>(
    EndPoints.AUTH.signUp,
    {
      fullName: value.fullName,
      email: value.email,
      password: value.password,
    }
  );
  return resp;
};

export const signInService = async (
  value: ISignIn
): Promise<IApiDataResponse<IUserResponse>> => {
  const resp = await httpClient.post<ISignIn, IApiDataResponse<IUserResponse>>(
    EndPoints.AUTH.signIn,
    {
      email: value.email,
      password: value.password,
    }
  );
  return resp;
};

export const forgotPasswordService = async (
  value: IEmailPost
): Promise<IApiDataResponse<void>> => {
  const resp = await httpClient.post<IEmailPost, IApiDataResponse<void>>(
    EndPoints.AUTH.forgotPassword,
    {
      email: value.email,
    }
  );
  return resp;
};

export const changePasswordService = async (
  value: IChangePassword
): Promise<IApiDataResponse<void>> => {
  const resp = await httpClient.patch<IChangePassword, IApiDataResponse<void>>(
    EndPoints.AUTH.changePassword,
    {
      otp: value.otp,
      email: value.email,
      password: value.password,
    }
  );
  return resp;
};

export const verificationEmailService = async (
  value: IVerificationEmail
): Promise<IApiDataResponse<IUserResponse>> => {
  const resp = await httpClient.patch<
    IVerificationEmail,
    IApiDataResponse<IUserResponse>
  >(EndPoints.AUTH.verificationEmail, {
    otp: value.otp,
    email: value.email,
  });
  return resp;
};

export const reSendOtpService = async (
  value: ISendOtp
): Promise<IApiDataResponse<void>> => {
  const resp = await httpClient.post<ISendOtp, IApiDataResponse<void>>(
    EndPoints.AUTH.sendOtp,
    {
      email: value.email,
    }
  );
  return resp;
};

export const phoneRegisterService = async (
  value: IPhoneRegister
): Promise<IApiDataResponse<IUserResponse>> => {
  const resp = await httpClient.patch<
    IPhoneRegister,
    IApiDataResponse<IUserResponse>
  >(EndPoints.AUTH.setPhoneNumber, {
    email: value.email,
    phoneNumber: value.phoneNumber,
  });
  return resp;
};
