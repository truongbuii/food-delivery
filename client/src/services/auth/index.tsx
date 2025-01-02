import { EndPoints } from "@/apis";
import createHttpClient from "@/apis/httpClient";
import {
  IApiDataResponse,
  IChangePassword,
  IEmailPost,
  ISignIn,
  ISignUp,
  IUserResponse,
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
