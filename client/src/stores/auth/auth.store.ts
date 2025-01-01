import { IUserInfo } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AUTH_STORAGE_KEY } from "@/configs";

interface IAuthState {
  token: string;
  userInfo?: IUserInfo;
  setTokens: (token: string) => void;
  setUserInfo: (userInfo: IUserInfo) => void;
  reset: () => void;
}

export const useAuthStore = create<IAuthState>()(
  persist(
    (set) => ({
      token: "",
      userInfo: undefined,

      setTokens: (token: string) =>
        set((state) => ({
          ...state,
          token,
        })),

      setUserInfo: (userInfo: IUserInfo) =>
        set((state) => ({
          ...state,
          userInfo,
        })),

      reset: () =>
        set(() => ({
          token: "",
          userInfo: undefined,
        })),
    }),
    { name: AUTH_STORAGE_KEY }
  )
);
