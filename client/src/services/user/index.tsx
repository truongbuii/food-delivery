import { EndPoints } from "@/apis";
import createHttpClient from "@/apis/httpClient";
import {
  IApiDataResponse,
  IApiErrorResponse,
  IProfile,
  IUserResponse,
} from "@/interfaces";

const httpClient = createHttpClient();

export const getProfileService = async (): Promise<
  IApiDataResponse<IUserResponse>
> => {
  const resp = await httpClient.get<
    IApiDataResponse<IUserResponse>,
    IApiErrorResponse
  >(EndPoints.USER.profile);
  return resp;
};

export const updateProfileService = async (
  value: IProfile
): Promise<IApiDataResponse<IUserResponse>> => {
  const resp = await httpClient.put<IProfile, IApiDataResponse<IUserResponse>>(
    EndPoints.USER.profile,
    {
      email: value.email,
      fullName: value.fullName,
      phoneNumber: value.phoneNumber,
      // dob: value.dob,
      // avatar: value.avatar,
    }
  );
  return resp;
};
