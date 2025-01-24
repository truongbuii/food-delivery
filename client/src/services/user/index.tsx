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
  const formData = new FormData();
  appendIfExists(formData, "email", value.email);
  appendIfExists(formData, "fullName", value.fullName);
  appendIfExists(formData, "phoneNumber", value.phoneNumber);
  appendIfExists(formData, "dob", value.dob);
  appendIfExists(formData, "avatar", value.avatar);

  const resp = await httpClient.put<IProfile, IApiDataResponse<IUserResponse>>(
    EndPoints.USER.profile,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return resp;
};

const appendIfExists = (formData: FormData, key: string, value: any) => {
  if (value) {
    formData.append(key, value);
  }
};
