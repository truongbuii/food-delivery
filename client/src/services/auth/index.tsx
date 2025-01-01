import { EndPoints } from "@/apis";
import createHttpClient from "@/apis/httpClient";
import {
  IApiDataResponse,
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
