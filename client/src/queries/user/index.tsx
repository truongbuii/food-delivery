import {
  IApiDataResponse,
  IApiErrorResponse,
  IProfile,
  IUserResponse,
} from "@/interfaces";
import { QUERIES_KEY } from "@/queries/key";
import { getProfileService, updateProfileService } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
  return useQuery<IApiDataResponse<IUserResponse>, IApiErrorResponse>({
    queryKey: [QUERIES_KEY.USER.GET_PROFILE],
    queryFn: getProfileService,
  });
};

export const useUpdateProfile = () => {
  return useMutation<
    IApiDataResponse<IUserResponse>,
    IApiErrorResponse,
    IProfile
  >({
    mutationFn: (value: IProfile) => updateProfileService(value),
    mutationKey: [QUERIES_KEY.USER.UPDATE_PROFILE],
  });
};
