import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AUTH_STORAGE_KEY, USER_STORAGE_KEY } from "@/configs";
import { IUserInfo, IUserResponse } from "@/interfaces";
import { MapperUser } from "@/mapping/user.mapping";

interface ITokenState {
  token: string;
  setToken: (token: string) => void;
  resetToken: () => void;
}

export const useTokenStore = create<ITokenState>()(
  persist(
    (set) => ({
      token: "",

      setToken: (token: string) =>
        set(() => ({
          token,
        })),

      resetToken: () => {
        set(() => ({
          token: "",
        }));
      },
    }),
    { name: AUTH_STORAGE_KEY }
  )
);

interface IUserState {
  userInfo?: IUserInfo;
  setUserInfo: (userInfo: IUserInfo) => void;
  resetUserInfo: () => void;
}

export const useUserStore = create<IUserState>()(
  persist(
    (set) => ({
      userInfo: undefined,

      setUserInfo: (userInfo: IUserInfo) =>
        set(() => ({
          userInfo,
        })),

      resetUserInfo: () => {
        set(() => ({
          userInfo: undefined,
        }));
      },
    }),
    { name: USER_STORAGE_KEY }
  )
);

export const useAuthActions = () => {
  const { setToken, resetToken, token } = useTokenStore();
  const { setUserInfo, resetUserInfo, userInfo } = useUserStore();

  const setAuth = ({ accessToken, ...userInfo }: IUserResponse) => {
    if (accessToken) {
      setToken(accessToken);
    }
    setUserInfo(MapperUser(userInfo));
  };

  const resetAuth = () => {
    resetToken();
    resetUserInfo();
  };

  return { setAuth, resetAuth, userInfo, token };
};
